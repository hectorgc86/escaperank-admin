import { Component, Directive, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Categoria } from 'src/app/salas/interfaces/categoria.interface';
import { Dificultad } from 'src/app/salas/interfaces/dificultad.interface';
import { Publico } from 'src/app/salas/interfaces/publico.interface';
import { Tematica } from 'src/app/salas/interfaces/tematica.interface';
import { Sala } from 'src/app/salas/interfaces/salas_categorias.interface';
import { CategoriasService } from 'src/app/salas/services/categorias.service';
import { DificultadesService } from 'src/app/salas/services/dificultades.service';
import { PublicoService } from 'src/app/salas/services/publico.service';
import { TematicasService } from 'src/app/salas/services/tematicas.service';
import { SalasService } from '../services/salas.service';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salas-form',
  templateUrl: './salas-form.component.html',
  styleUrls: ['./salas-form.component.scss']
})

export class SalasFormComponent implements OnInit {
  dificultades: Dificultad[] = [];
  selectedDificultadId: string = '';
  publicos: Publico[] = [];
  selectedPublico: any = null;
  tematicas: Tematica[] = [];
  selectedTematica: any = null;
  categorias: Categoria[] = [];
  selectedCategoria: any = null;
  sala:Sala;
  imageName = '';
  imagen: any;
  salaForm: FormGroup;
 salaId?: string;


  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  isUpdating: any;
  constructor(
    private route: ActivatedRoute,
    private salasService: SalasService,
    private publicoService: PublicoService,
    private categoriasService: CategoriasService,
    private tematicasService: TematicasService,
    private dificultadesService: DificultadesService,
    private fb: FormBuilder
    ) { 

      this.salaForm = this.fb.group({
        promocionada: [false],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        duracion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        edadPublico: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        minimoJugadores: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        maximoJugadores: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        precioMinimo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        precioMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        dificultad: [null, Validators.required],
        publico: [null, Validators.required],
        tematicas: [null, Validators.required],
        categorias: [null, Validators.required],
        urlReserva: [null, Validators.required],
        companyiaId: [''],
        proximamente: [''],
        visto: [''],
        modoCombate: [''],
        textoCombate: [''],
        salaIgual: [''],
        enOferta: [''],
        textoOferta: [''],
        numeroResenyas: [''],
        regaloBonus: [''],
        disponibleIngles: [''],
        adaptadoMinusvalidos: [''],
        adaptadoCiegos: [''],
        adaptadoSordos: [''],
        adaptadoEmbarazadas: [''],
        noClaustrofobicos: [''],
        jugadoresIncluidos: [''],
        precioJugadorAdicional: [''],
        validez: [''],
        comoReservar: [''],
        terminosReserva: [''],
        otrosDatos: [''],

      });
    }


  @ViewChild('dz') drpzone?: DropzoneComponent;
 // @ViewChild('dz2') drpzone2?: DropzoneComponent;

  ngOnInit(): void {
    let getSala = <Sala>this.route.snapshot.data['sala'];
    if (getSala != null && getSala.id != null) {
      this.salaId = getSala.id;
    }
    this.dificultadesService.getDificultades().subscribe((dificultades)=>{this.dificultades = dificultades});
   this.tematicasService.getTematicas().subscribe((tematicas)=>{ this.tematicas = tematicas});
   this.publicoService.getPublico().subscribe((publicos)=>{ this.publicos = publicos});
  this.categoriasService.getCategorias().subscribe((categorias)=>{this.categorias= categorias});   
  }
  
  
  resetDropzone1Uploads(): void {
    this.drpzone?.directiveRef?.reset()
    this.drpzone?.directiveRef?.dropzone();
   
  }
 /* resetDropzone2Uploads(): void {
    this.drpzone2?.directiveRef?.reset()
    this.drpzone2?.directiveRef?.dropzone();


  }*/

  onSuccess(event: any){
    console.log('onSuccessFirstCarPhoto:', event);

  }

  onAddedFile(file: any):void{
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', (e) => {
      this.imagen=e.target?.result;
      this.imageName = reader.result as string;
    });
  }



  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }
  onRemoved(event: any){
    console.log('onRemovedFirstCarPhoto:', event);
  }
  onSending(event: any){
    console.log('onSending:', event);
  }
  onFileDropped(event:any){
    console.log('onFileDropped:', event);

  }
  onRemoveFile(event:any){
    console.log('onRemoveFile:', event);
  }


  async addSala(): Promise<boolean> {
    if (!this.salaForm.valid) {
      Object.values(this.salaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return false;
    }

    let result: boolean;
    //event with newEvent data to store in events[]
    let salaCreada: Sala = {
      nombre: this.salaForm.controls.nombre.value,
      descripcion: this.salaForm.controls.descripcion.value,
      promocionada: this.salaForm.controls.promocionada.value,
      duracion: this.salaForm.controls.duracion.value,
      edadPublico: this.salaForm.controls.edadPublico.value,
      minimoJugadores: this.salaForm.controls.minimoJugadores.value,
      maximoJugadores:this.salaForm.controls.maximoJugadores.value,
      precioMinimo: this.salaForm.controls.precioMinimo.value,
      precioMaximo:this.salaForm.controls.precioMaximo.value,
      dificultadId:this.salaForm.controls.dificultad.value,
      publico: this.salaForm.controls.publico.value,
      tematicas: this.salaForm.controls.tematicas.value,
      categorias:this.salaForm.controls.categorias.value,
      urlReserva:this.salaForm.controls.urlReserva.value,
      imagenEstrecha: this.imagen,
      companyiaId: localStorage.getItem("companyiaId")
    };
    if (this.isUpdating) {
      return this.updateSala(salaCreada);
    } else {
      return this.saveSala(salaCreada);
    }
  }

  updateSala(createdSala: Sala) {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      createdSala.id = this.salaId;
      this.salasService.updateSala(createdSala).subscribe({
        next: (sala) => {
        //  this.showImage = false;
        //  this.saved = true;
       //   this.add.emit(event);
          location.assign('/administracion/salas');
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
          console.log('Sala actualizada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }

  saveSala(salaCreada: Sala) {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.salasService.addSala(salaCreada).subscribe({
        next: (sala) => {
         /* this.showImage = false;
          this.saved = true;
          this.add.emit(event);
          location.assign('/events');
          result = true;
          resolve(result);*/
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
          console.log('Sala creada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }


  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.imageName= reader.result as string;
    });
  }



}



