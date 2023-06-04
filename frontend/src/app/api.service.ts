import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }  

  public createContact(user: User){
    return this.httpClient.post<User>(`${this.API_SERVER}/user/create`, user);
  }

  public updateContact(user: User){
    return this.httpClient.put<User>(`${this.API_SERVER}/user/${user.id}/update`, user);
  }
}
