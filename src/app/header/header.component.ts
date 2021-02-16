import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  // Elements
  @ViewChild('header', {static: true}) headerComponent: ElementRef;

  // Vars
  isSticky: boolean = false;
  stickyThresh: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    // Set threshold for sticky header to 99% as Css has margin-top: 1%
    this.stickyThresh = pageYOffset + this.headerComponent.nativeElement.getBoundingClientRect().top;
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    if(window.pageYOffset > this.stickyThresh){
      this.isSticky = true;
    }else{
      this.isSticky = false;
    }
  }
}
