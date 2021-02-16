import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, AfterViewInit {

  @ViewChildren('roadmap') roadmap:QueryList<ElementRef>;
  isHorizontal: boolean;
  interimNode: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.calculateGraphNodes();
  }

  @HostListener('window:resize', ['$event']) // See if you can only do this using eventBinding
  onResize(event){
    // Re-calculate bar connections
    this.calculateGraphNodes();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event){
    setTimeout(() => {
      this.calculateGraphNodes();
    }, 500);
  }

  calculateGraphNodes(){
    // Check if horizontal or vertical
    this.isHorizontal = window.innerWidth <= 1280 ? false : true; // <1280 === lt-md in flex-layout

    // Fetch all nodes for calculation
    let roadmapNodes: any[] = this.roadmap.first.nativeElement.children;

    if(this.isHorizontal) // Calculate horizontal - progress bars are absolute in this view, centered in the parent
    {
      // Loop through all button nodes and calculate:
      let count: number  = 1;
      for( let i = 0; i < roadmapNodes.length; i +=2){

        if( i + 2 >= roadmapNodes.length){
          console.log(`No more nodes to process`);
          this.interimNode = false;
          return;
        }

        // From the center, buttons are moved 40% of the viewport (20vh) up and down each way
        // We need to find the center of each button (X,Y)
        // Set length of hypotenuse to the correct fraction of the viewport height? hyp * viewport height

        let centerXOne = (roadmapNodes[i].offsetLeft + roadmapNodes[i].offsetWidth / 2); // Doesn't need to change because they are auto spaced
        let centerYOne;

        if(this.interimNode){
          centerYOne = (roadmapNodes[i].offsetTop + roadmapNodes[i].offsetHeight / 2) + (window.innerHeight * 0.2); // Translate based on the viewport height it has been altered by
        }else{
          centerYOne = (roadmapNodes[i].offsetTop + roadmapNodes[i].offsetHeight / 2) - (window.innerHeight * 0.2); // Translate based on the viewport height it has been altered by
        }

        let centerXTwo = roadmapNodes[i + 2].offsetLeft + roadmapNodes[i + 2].offsetWidth / 2;
        let centerYTwo;

        if(this.interimNode){
          centerYTwo = (roadmapNodes[i + 2].offsetTop + roadmapNodes[i + 2].offsetHeight / 2) - (window.innerHeight * 0.2);
        }else{
          centerYTwo = (roadmapNodes[i + 2].offsetTop + roadmapNodes[i + 2].offsetHeight / 2) + (window.innerHeight * 0.2);
        }

        let dx = centerXTwo - centerXOne;
        let dy = centerYTwo - centerYOne;
        let hypot = Math.sqrt((dx * dx) + (dy * dy));
        let angle = Math.asin(dy / hypot) * (180 / Math.PI);

        let connector = roadmapNodes[i+1];

        let connectorOffset = (-(window.innerWidth * 0.5) + (centerXOne + (dx * 0.5)) + window.innerWidth * 0.375);
        (window.innerWidth >= 1281 && window.innerWidth <= 1680) ? connectorOffset -=30 : connectorOffset;

        connector.style.left = connectorOffset + "px";

        connector.style.transform = (connector.attributes.mode.nodeValue === 'buffer') ? `rotate(${angle + 180}deg)` : `rotate(${angle}deg)`;

        this.interimNode = !this.interimNode;
      }
    }
    else // Calculate vertically
    {
      // Loop through all button nodes and calculate:
      for( let i = 0; i < roadmapNodes.length; i +=2){

        if( i + 2 >= roadmapNodes.length){
          console.log(`No more nodes to process`);
          this.interimNode = false;
          return;
        }

        // Setup values for the iteration - Pythag
        let deltaX = -1;
        let deltaY = -1;
        if(this.interimNode){
          deltaX = roadmapNodes[i].offsetLeft + (window.innerWidth * 0.75) - roadmapNodes[i + 2].offsetLeft - (window.innerWidth * 0.25);
          deltaY = roadmapNodes[i].offsetTop - roadmapNodes[i + 2].offsetTop;
        }else{
          deltaX = roadmapNodes[i+2].offsetLeft + (window.innerWidth * 0.75) - roadmapNodes[i].offsetLeft - (window.innerWidth * 0.25) ;
          deltaY = roadmapNodes[i+2].offsetTop - roadmapNodes[i].offsetTop;
        }

        let hypotenuse =  Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
        let theta: number = (Math.round(Math.asin(deltaY / hypotenuse)* (180 / Math.PI)));

        // Connect the bars between the elements
        let progressBar = roadmapNodes[i+1];
        let width: string = Math.round(hypotenuse/window.innerWidth * 100) +  '%';
        progressBar.style.width = width;

        // Calculate the sine angle in order to calculate the magnitude to rotate the lines
        if(this.interimNode){
          // + 180 if indeterminate, otherwise no rotation
          progressBar.style.transform = (progressBar.attributes.mode.nodeValue === 'buffer') ? `rotate(${theta}deg)` : `rotate(${theta + 180}deg)`;
        }else{
          progressBar.style.transform = (progressBar.attributes.mode.nodeValue === 'buffer') ? `rotate(${theta + 180}deg)` : `rotate(${theta}deg)`;
        }

        this.interimNode = !this.interimNode;
      }
    }
  }

}

