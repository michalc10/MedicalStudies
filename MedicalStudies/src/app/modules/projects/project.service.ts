import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  postProject(project: Project) {
    return this.http.post<any>("http://localhost:3000/projects/", project);
  }

  getProjects() {
    return this.http.get<any>("http://localhost:3000/projects/");
  }

  putProject(project: Project,id:number) {
    return this.http.put<any>("http://localhost:3000/projects/" + id, project);
  }

  deleteProject(id:number){
    return this.http.delete<any>("http://localhost:3000/projects/" + id);
  }
}
