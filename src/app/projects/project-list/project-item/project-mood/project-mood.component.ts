import { Component, OnInit, Input } from '@angular/core';
import { Mood } from './mood.model';

@Component({
  selector: 'app-project-mood',
  templateUrl: './project-mood.component.html',
  styleUrls: ['./project-mood.component.css']
})
export class ProjectMoodComponent implements OnInit {

  @Input() moodItem: Mood;
  constructor() { }

  ngOnInit(): void {

  }

}
