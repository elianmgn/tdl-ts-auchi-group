import { NestFactory } from '@nestjs/core';
import { Server as HttpServer } from 'http';
import { Sequelize } from 'sequelize-typescript';
import * as Umzug from 'umzug';
import { AppModule } from './app.module';
import { database, paths, server } from './config';
import { User } from './modules/user/model';
import { Transaction } from './modules/transaction/model';

export class ServerSetup {
  private http!: HttpServer;

  public sequelize!: Sequelize;

  private umzug: Umzug.Umzug;

  constructor() {
    this.init();
  }

  /**
   * Calls all the methods required to start the api
   */
  public async init(): Promise<void> {
    await this.initSequelize();
    await this.checkMigrations();
    await this.checkSeeders();
    this.initNestServer();
  }

  /**
   * Creates a new instance of sequelize and synchronizes it with the database
   */
  private initSequelize() {
    this.sequelize = new Sequelize({
      database: database.database,
      host: database.host,
      port: database.port,
      dialect: database.dialect,
      username: database.username,
      password: database.password,
      sync: { force: database.sync.force },
      models: [User, Transaction], // List of sequelize models
    });

    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.sequelize,
      },
      migrations: {
        params: [
          this.sequelize.getQueryInterface(),
          this.sequelize.constructor,
          () => {
            throw new Error(
              'Migration tried to use old style "done" callback.upgrade',
            );
          },
        ],
        path: paths.migrations,
        pattern: /\.js$/,
      },
    });
  }

  /**
   * Checks if all the migrations were successfully executed
   */
  async checkMigrations(): Promise<void> {
    const migrations = await this.umzug.pending();
    if (migrations.length) {
      throw new Error('There are pending migrations');
    }
  }

  /**
   * Checks if all the seeders were successfully executed
   */
  async checkSeeders(): Promise<void> {
    const seeders = await this.umzug.pending();
    if (seeders.length) {
      throw new Error('There are pending seeders');
    }
  }

  /**
   * Starts listening for http calls in the given serverPort
   */
  async initNestServer() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(server.port);
    console.log(`App is running on PORT: ${server.port}`);
  }
}
