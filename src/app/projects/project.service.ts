import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from './project.model';

@Injectable({providedIn: 'root'})
export class ProjectService{

  constructor(private http: HttpClient) {}

  getProjects(){
    return this.http.get<Project[]>('/api/projects');
  }

  getProject(index: number){
    return this.http.get<Project>(`/api/projects/${index}`);
  }

  addProject(payload){
    return this.http.post<Project>('/api/projects', payload);
  }

  deleteProject(id){
    return this.http.delete<Project>(`/api/projects/${id}`);
  }

  updateProject(payload, id){
    return this.http.patch<Project>(`/api/projects/${id}`, payload)
  }
}
