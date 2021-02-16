import { Component, OnInit, Input } from '@angular/core';
import {style, trigger, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-roadmap-node',
  templateUrl: './roadmap-node.component.html',
  styleUrls: ['./roadmap-node.component.css'],
  animations: [
    trigger('anim', [
      state('show', style({
        transform: 'scale(2.5)',
        backgroundSize: 'cover'
      })),
      state('hide',   style({
        opacity: 1,
        transform: 'scale(1.5)',
        backgroundSize: 'cover'
      })),
      transition('show => hide', animate('1000ms cubic-bezier(0.64, 0, 0.78, 0)')),
      transition('hide => show', animate('1000ms cubic-bezier(0.33, 1, 0.68, 1)'))
    ]),
  ]
})
export class RoadmapNodeComponent implements OnInit {

  state: string;
  @Input('label') nodeDescription?: string;
  @Input('title') nodeProjectTitle?: string;
  @Input('project-image') nodeBackgroundImagePath: string;
  @Input('textColor') textColor: string = "black";

  constructor()
  {
    this.state = 'hide';
  }

  ngOnInit(): void {
  }


}
