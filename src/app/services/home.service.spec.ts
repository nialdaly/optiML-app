import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Home } from '../models/home.model';
@Injectable()
export class HomeService {
  // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  private serviceUrl = 'http://127.0.0.1:5000/';
  
  constructor(private http: HttpClient) { }
  
  getUser(): Observable<Home[]> {
    return this.http.get<Home[]>(this.serviceUrl);
  }
}