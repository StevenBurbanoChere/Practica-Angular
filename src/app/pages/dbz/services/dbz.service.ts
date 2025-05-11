import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dbzs } from '../interfaces/dbzs';


@Injectable({
  providedIn: 'root',
})
export class DbzService {
  private apiURLBase: string = 'https://web.dragonball-api.com/';
  
  constructor(
    private http: HttpClient
  ) { }

  getdbzs(): Observable<Dbzs>{
    return this.http.get<Dbzs>(this.apiURLBase);
  }

  getdbz(termino: string | number): Observable<Dbzs>{
    return this.http.get<Dbzs>(`${this.apiURLBase}${termino}`);
  }

}
