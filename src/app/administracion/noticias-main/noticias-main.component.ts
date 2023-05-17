import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-noticias-main',
  templateUrl: './noticias-main.component.html',
  styleUrls: ['./noticias-main.component.scss']
})
export class NoticiasMainComponent implements OnInit {

  isLoading: boolean;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    //TODO meter llamada para obtener todas las noticias de un GAMEMASTER y el isLoading = false cuando retorne el servicio;

    this.isLoading = false;
  }
 nuevaNoticia() {
    this.router.navigate(["administracion/noticias/nueva"]);
  }
}


