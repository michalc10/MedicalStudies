import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudyOrder } from './studyOrder';

@Injectable({
  providedIn: 'root'
})
export class StudyOrderService {
  private api ="http://localhost:3000/studyOrder/";
  constructor(private http: HttpClient) {
  }

  postStudyOrder(studyOrder: StudyOrder) {
    return this.http.post<any>(this.api, studyOrder);
  }

  getStudyOrder() {
    return this.http.get<any>(this.api);
  }

  putStudyOrder(studyOrder: StudyOrder,id:number) {
    return this.http.put<any>(this.api + id, studyOrder);
  }

  deleteStudyOrder(id:number){
    return this.http.delete<any>(this.api + id);
  }
}
