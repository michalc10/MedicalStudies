import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudyOrder } from './studyOrder';

@Injectable({
  providedIn: 'root'
})
export class StudyOrderService {

  constructor(private http: HttpClient) {
  }

  postStudyOrder(studyOrder: StudyOrder) {
    return this.http.post<any>("http://localhost:3000/studyOrder/", studyOrder);
  }

  getStudyOrder() {
    return this.http.get<any>("http://localhost:3000/studyOrder/");
  }

  putStudyOrder(studyOrder: StudyOrder,id:number) {
    return this.http.put<any>("http://localhost:3000/studyOrder/" + id, studyOrder);
  }

  deleteStudyOrder(id:number){
    return this.http.delete<any>("http://localhost:3000/studyOrder/" + id);
  }
}
