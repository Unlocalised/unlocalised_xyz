import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Project } from '../../project.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit, OnDestroy {

  @Input() projectItem: Project;
  @Input() myIndex: number = 0;
  @Input() currentIndex: number = 0;
  @Input('numProjects') projectsLength: number;
  @Output() shownProjectChanged = new Subject<number>();



  constructor() { }

  ngOnInit(): void {
  }

  nextStep() {
    this.shownProjectChanged.next(this.myIndex + 1);
    this.currentIndex = this.myIndex + 1;
  }

  resetStep() {
    this.shownProjectChanged.next(this.myIndex);
    this.currentIndex = this.myIndex;
  }
  ngOnDestroy(){
    this.shownProjectChanged.unsubscribe();
  }
}
