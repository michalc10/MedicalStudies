import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private api = "http://localhost:3000/projects/";
  constructor(private http: HttpClient) {
  }

  postProject(project: Project) {
    return this.http.post<any>(this.api, project);
  }

  getProjects() {
    return this.http.get<any>(this.api);
  }

  putProject(project: Project,id:number) {
    return this.http.put<any>(this.api + id, project);
  }

  deleteProject(id:number){
    return this.http.delete<any>(this.api + id);
  }
}
