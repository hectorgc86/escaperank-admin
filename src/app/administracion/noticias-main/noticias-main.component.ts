import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-noticias-main',
  templateUrl: './noticias-main.component.html',
  styleUrls: ['./noticias-main.component.scss']
})
export class NoticiasMainComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }
 nuevaNoticia() {
    this.router.navigate(["administracion/noticias/nueva"]);
  }
}


