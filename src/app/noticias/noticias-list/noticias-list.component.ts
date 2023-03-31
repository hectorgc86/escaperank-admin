import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.scss']
})
export class NoticiasListComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  nuevaNoticia(){
  this.router.navigate(["/noticias/nueva"]);
}
}
