
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Home, Tasks, Metrics } from '../models/home.model';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://127.0.0.1:5000/api/run_pred/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class HomeService {

  private serviceUrl = '../../assets/data/temp_model_data.json';
  // private serviceUrl = 'https://cors-anywhere.herokuapp.com/https://still-dawn-14885.herokuapp.com/api/data';


  constructor(private http: HttpClient) { }

  getHome(): Observable<Home[]> {
    return this.http.get<Home[]>(this.serviceUrl);
  }

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.serviceUrl);
  }

  getAnswer(contextInput: string, questionInput: string): Observable<any> {

    return this.http.post('http://127.0.0.1:5000/api/run_pred/',
      {

        "input": {

          "context": contextInput,
          "question": questionInput

        }
      }

    );
  };

  getPDFText(urlInput: string): Observable<any> {

    return this.http.post('http://127.0.0.1:5000/api/parse_text/',
      {

        "input": {

          "urlInput": urlInput

        }
      }

    );

  }

}