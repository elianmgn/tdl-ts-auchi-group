cat > ./src/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface } from 'sequelize';
export default {
  up: async(queryInterface: QueryInterface, Sequelize: any) => {
  // Write migration code here.
  },
  down: async(queryInterface: QueryInterface, Sequelize: any) => {
  // If migration fails, this will be called. Rollback your migration changes.
  },
};
EOF
