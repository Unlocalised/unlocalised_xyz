import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
      })),
      state('hide',   style({
        opacity: 0,
      })),
      transition('show => hide', animate('2000ms cubic-bezier(0.64, 0, 0.78, 0)')),
      transition('hide => show', animate('2000ms cubic-bezier(0.33, 1, 0.68, 1)'))
    ])
  ]
})
export class InfoSectionComponent implements OnInit {

  @Input() titleSize?: string;
  @Input() titleText?: string;
  @Input() paragraphText?: string;
  @Input() backgroundImage?: string;
  @Input() backgroundGradient?: any;
  @Input() showInitially: boolean = false;
  @Input() textColor: string = "black";
  @Input() imageAlt? : string = 'default-image';

  state = 'hide';
  paragraphs: string[] = [];

  constructor(public el: ElementRef){}

  ngOnInit(): void {
    if(this.paragraphText){ // If paragraph exists
      this.paragraphs = this.paragraphText.split('<break>');
    }

    // Show info section immediately if at the top of screen or showInitially is set
    if(this.showInitially || window.pageYOffset > 0){
      this.state = 'show';
    }

  }

  // On scroll, fade in and out
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition * 0.6) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }
  }


}
