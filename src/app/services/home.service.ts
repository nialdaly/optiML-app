
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaperData, QAData, ParserData } from '../models/home.model';

@Injectable()
export class HomeService {
  // private pwcodeDataAPI = 'https://cors-anywhere.herokuapp.com/https://still-dawn-14885.herokuapp.com/api/data';
  private pwcodeDataAPI = '../../assets/data/temp_model_data_2.json';
  private qaAPI = 'http://127.0.0.1:5000/api/get_answer/';
  private parsePaperAPI = 'http://127.0.0.1:5000/api/parse_text/';


  constructor(private http: HttpClient) { }

  getPaperData(): Observable<PaperData[]> {
    return this.http.get<PaperData[]>(this.pwcodeDataAPI);
  }

  getAnswer(context: string, question: string) {
    return this.http.post<QAData[]>(this.qaAPI, {
      "answer": {
        "context": context,
        "question": question
      }
    }).map((response: any) => response.answer)
  }

  getPDFText(paperURL: string) {
    return this.http.post<ParserData[]>(this.parsePaperAPI, {
        "parsed_text": {
          "paper_url": paperURL
        }
      }).map((response: any) => response.parsed_text)
  }

}