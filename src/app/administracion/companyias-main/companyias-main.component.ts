import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from 'express';
import { Noticia } from 'src/app/noticias/interfaces/noticia.interface';
import { ImageUtils } from 'src/app/utils/image-utils';
import { NoticiasService } from '../services/noticias.service';
import { Companyia } from 'src/app/salas/interfaces/companyia.interface';
import { CompanyiasService } from '../services/companyias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companyias-main',
  templateUrl: './companyias-main.component.html',
  styleUrls: ['./companyias-main.component.scss']
})
export class CompanyiasMainComponent implements OnInit {

  @ViewChild("myModalValidar") myModalValidar: any;
  @ViewChild("myModalRechazar") myModalRechazar: any;

  imageUtils = ImageUtils;

  isLoading: boolean;
  selectedCompanyiaId:string;
  selectedCompanyia: Companyia;
  companyias: Companyia[];
  modalRef: NgbModalRef;
  constructor(private companyiasService: CompanyiasService,
    private modalService: NgbModal,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.companyiasService
      .getCompanyiasAValidar()
      .subscribe((companyias) => {
        this.companyias = companyias;
        this.isLoading = false;
      });
  }


  validarCompanyia() {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.companyiasService.validarCompanyia(this.selectedCompanyia).subscribe({
        next: (sala) => {
          location.assign('/administracion/companyias');
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
          console.log('Compañía validada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }

  rechazarCompanyia() {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.companyiasService.invalidarCompanyia(this.selectedCompanyia).subscribe({
        next: (sala) => {
          location.assign('/administracion/companyias');
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
          console.log('Compañía validada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }
  openModalValidar(companyia: Companyia) {
    this.selectedCompanyiaId = companyia.id as string;
    this.selectedCompanyia =companyia;
    this.modalRef = this.modalService.open(this.myModalValidar);
  }
  openModalRechazar(companyia: Companyia) {
    this.selectedCompanyiaId = companyia.id as string;
    this.selectedCompanyia =companyia;
    this.modalRef = this.modalService.open(this.myModalRechazar);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
