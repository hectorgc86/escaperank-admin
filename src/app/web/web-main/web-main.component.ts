import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: [
  './web-main.component.scss'
]
})
export class WebMainComponent implements OnInit, AfterViewInit {

  constructor() { }

  currentSection = 'home';
  isLoading: boolean;

  ngOnInit(): void {
    this.loadStyles('assets/css/style1.css');
    this.isLoading = true;
}

ngAfterViewInit(): void {
  this.isLoading = false;
}

private loadStyles(stylePath: string) {
  const styleElement = document.createElement('link');
  styleElement.setAttribute('rel', 'stylesheet');
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('href', stylePath);
  document.head.appendChild(styleElement);
}
  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      if(navbar){
      navbar.style.backgroundColor = '#272a33';
      navbar.style.padding = '10px';
      }
    }
    else {
      if(navbar){
      navbar.style.backgroundColor = '';
      navbar.style.padding = '20px';
      }
    }
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
  /**
   * Toggle navbar
   */
  toggleMenu() {
    const navbarCollapse = document.getElementById('navbarCollapse')
    if(navbarCollapse){
    navbarCollapse.classList.toggle('show');
    }
  }
}
