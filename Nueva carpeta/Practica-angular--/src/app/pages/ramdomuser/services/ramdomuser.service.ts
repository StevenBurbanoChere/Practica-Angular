import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users'; // <- importa Users

@Injectable({
  providedIn: 'root'
})
export class RamdomuserService {
  private apiUrl: string = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  
  getUsers(page: number = 1, results: number = 12): Observable<Users> {
  
    const url = `${this.apiUrl}?page=${page}&results=${results}`;
    return this.http.get<Users>(url); 
  }
}
