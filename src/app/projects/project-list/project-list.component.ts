import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  currentStep: number = 0;

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects =>{
      this.projects = projects;
    })
  }

  changeCurrentProjectShown(nextProjectToShow: number){
    this.currentStep = nextProjectToShow;
  }

}
