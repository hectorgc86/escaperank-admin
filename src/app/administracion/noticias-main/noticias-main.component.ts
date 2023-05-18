import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from 'src/app/noticias/interfaces/noticia.interface';
import { ImageUtils } from "src/app/utils/image-utils";
import { NotFoundError } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-noticias-main',
  templateUrl: './noticias-main.component.html',
  styleUrls: ['./noticias-main.component.scss']
})
export class NoticiasMainComponent implements OnInit {
  @ViewChild("myModal") myModal: any;
  imageUtils = ImageUtils;

  isLoading: boolean;
  selectedNoticiaId:number;
  selectedNoticiaTitular = "";
  noticias: Noticia[];
  modalRef: NgbModalRef;
  constructor(   private noticiasService: NoticiasService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    //TODO meter llamada para obtener todas las noticias de un GAMEMASTER y el isLoading = false cuando retorne el servicio;
    this.isLoading = true;

    this.noticiasService
      .getNoticiasCompanyia(localStorage.getItem("companyiaId")!)
      .subscribe((noticias) => {
        this.noticias = noticias;
        this.isLoading = false;
      });
    this.isLoading = false;
  }
 nuevaNoticia() {
    this.router.navigate(["administracion/noticias/nueva"]);
  }


  editarNoticia(noticia:Noticia){
      this.router.navigate(["administracion/noticias/"+noticia.id+"/edit/"]);
   }
  
  eliminarNoticia() {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.noticiasService
            .deleteNoticia(
              this.selectedNoticiaId
            ).subscribe({
        next: (noticia) => {
          location.assign('/administracion/noticias');
          result = true;
          resolve(result);
        },
        error: (error: { message: any; }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
          result = false;
          resolve(result);
        },
        complete: () => {
          console.log('Noticia Eliminada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;  
  }

  openModal(noticia: Noticia) {
    this.selectedNoticiaId = noticia.id as number;
    this.selectedNoticiaTitular = noticia.titular as string;
    this.modalRef = this.modalService.open(this.myModal);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}



