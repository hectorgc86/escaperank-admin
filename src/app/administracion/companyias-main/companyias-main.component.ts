import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ImageUtils } from 'src/app/core/utils/image-utils';
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
  @ViewChild("myModalActivar") myModalActivar: any;
  @ViewChild("myModalDesactivar") myModalDesactivar: any;
  imageUtils = ImageUtils;

  isLoading: boolean;
  selectedCompanyiaId:string;
  selectedCompanyia: Companyia;
  companyias: Companyia[];
  companyiasBusqueda: Companyia[];

  modalRef: NgbModalRef;
  termino: string;
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
      this.termino = "";
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


  activarCompanyia() {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.companyiasService.activarCompanyia(this.selectedCompanyia).subscribe({
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
          console.log('Compañía activada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }

  desactivarCompanyia() {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.companyiasService.desactivarCompanyia(this.selectedCompanyia).subscribe({
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
          console.log('Compañía desactivada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }
  buscar(termino: string) {
    this.termino = termino;
    this.companyiasService
    .getCompanyias(this.termino)
    .subscribe((companyias) => {
      this.companyiasBusqueda = companyias;
      this.isLoading = false;
    });
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

  openModalActivar(companyia: Companyia) {
    this.selectedCompanyiaId = companyia.id as string;
    this.selectedCompanyia =companyia;
    this.modalRef = this.modalService.open(this.myModalActivar);
  }

  openModalDesactivar(companyia: Companyia) {
    this.selectedCompanyiaId = companyia.id as string;
    this.selectedCompanyia =companyia;
    this.modalRef = this.modalService.open(this.myModalDesactivar);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
