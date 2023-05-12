import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
/**
 * Footer component
 */
export class FooterComponent implements OnInit {

  isVisible = false;
  cur_year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Onclick color change
   * @param theme theme color
   */
  setTheme(theme: any) {
    const colorOpt = document.getElementById('color-opt')
    if (colorOpt)
    colorOpt.setAttribute('href', 'assets/css/colors/' + theme + '.css');
  }
  toggleSwitcher() {
    this.isVisible = !this.isVisible;
  }
}