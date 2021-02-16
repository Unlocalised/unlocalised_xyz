import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [
    trigger('overlayAnimation', [
      state('show', style({
        opacity: 0.7
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('500ms cubic-bezier(0.64, 0, 0.78, 0)')),
      transition('hide => show', animate('1000ms cubic-bezier(0.33, 1, 0.68, 1)'))
    ])
  ]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  state: string = 'hide';
  shownProject: Project;
  projectHasLoaded: boolean = false;

  constructor(private projectService: ProjectService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Active route is automatiacally unsubscribed
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.projectService.getProject(+params['id']).subscribe(project => {
          this.shownProject = project;
          this.projectHasLoaded = true;
        },
        error =>{
          this.projectHasLoaded = true;
          this.router.navigate(['/not-found']);
        });
      }
    )
  }

  displayOverlay(){
    this.state = "show";
  }

  hideOverlay(){
   this.state = "hide";
  }

  openLink(url: string){
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  ngOnDestroy(){

  }
}
