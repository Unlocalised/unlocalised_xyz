import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ContactService {

  constructor(private http: HttpClient) {}

  sendEmail(payload){
    return this.http.post('/api/contact', payload, {headers: new HttpHeaders().set("Content-Type", "application/json")});
  }

}
