import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, query } from '@angular/animations';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';


@Component({
  selector: 'app-social-icon',
  templateUrl: './social-icon.component.html',
  styleUrls: ['./social-icon.component.css'],
  animations: [
    trigger('bounceIcon', [
      state('initial', style({'backgroundColor': ''})),
      state('active', style({'backgroundColor': ''})),
      transition('initial => active', [
        animate('1s', keyframes([
          style({ transform: 'scale(1,1) translateY(0)' }),
          style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
          style({ transform: 'scale(0.9, 1.1) translateY(-10px)' }),
          style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
          style({ transform: 'scale(1,1) translateY(-7px)' }),
          style({ transform: 'scale(1,1) translateY(0)' }),
        ]))
      ])
    ])
  ]
})
export class SocialIconComponent implements OnInit {

  state: string;
  isExternal: boolean = false;
  @Input() isLinked: boolean = true;
  @Input() iconClass: string;
  @Input() infoLabel: string;
  @Input() link: string;

  constructor()
  {
    this.state = 'initial';
  }

  ngOnInit(): void {
    if(this.link == null){
        this.isLinked = false;
    }else if(this.link.includes("https")){
      this.isExternal = true;
    }
  }

  openLink(url: string){
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
