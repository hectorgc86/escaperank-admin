import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas-list',
  templateUrl: './salas-list.component.html',
  styleUrls: ['./salas-list.component.scss']
})
export class SalasListComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  nuevaSala(){
    this.router.navigate(["/salas/nueva"]);
  }
}
