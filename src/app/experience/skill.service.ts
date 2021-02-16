import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from './skill.model';

@Injectable({providedIn: 'root'})
export class SkillService{

  constructor(private http: HttpClient) {}

  getSkills(){
    return this.http.get<Skill[]>('/api/experience');
  }

  getSkill(skillName: string){
    return this.http.get<Skill>(`/api/experience/?skillName=${skillName}`);
  }

  addSkill(payload){
    return this.http.post<Skill>(`/api/experience`, payload);
  }

  deleteSkill(id){
    return this.http.delete<Skill>(`/api/experience/${id}`);
  }

  updateSkill(payload, id){
    return this.http.patch<Skill>(`/api/experience/${id}`, payload);
  }
}
