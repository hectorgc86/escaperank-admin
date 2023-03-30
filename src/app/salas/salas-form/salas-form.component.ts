import { Component, Directive, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';

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


  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  public config2: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  constructor() { }


  @ViewChild('dz') drpzone?: DropzoneComponent;
  @ViewChild('dz2') drpzone2?: DropzoneComponent;

  ngOnInit(): void {
    this.dificultades = Dificultades.dificultades;
    this.publicos = Publicos.publicos;
    this.tematicas = Tematicas.tematicas;
    this.categorias = Categorias.categorias;
  }
  
  
  resetDropzone1Uploads(): void {
    this.drpzone?.directiveRef?.reset()
    this.drpzone?.directiveRef?.dropzone();
   
  }
  resetDropzone2Uploads(): void {
    this.drpzone2?.directiveRef?.reset()
    this.drpzone2?.directiveRef?.dropzone();


  }

  onSuccess(event: any){
    console.log('onSuccessFirstCarPhoto:', event);

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
}

export class Dificultades {
  public static dificultades: Dificultad[] = [
		// ng-select => peoples
    {
      'id': '1',
     'dificultad':'Baja'
    },
    {
      'id': '2',
     'dificultad':'media'
    },
    {
      'id': '3',
     'dificultad':'Alta'
    }];
  }

    export interface Dificultad {
      id: string;
      dificultad?: string;
    }


    export class Publicos {
      public static publicos: Publico[] = [
        // ng-select => peoples
        {
          'id': '1',
         'publico':'Infantil'
        },
        {
          'id': '2',
         'publico':'Adolescente'
        },
        {
          'id': '3',
         'publico':'Adultos'
        }];
      }
    
        export interface Publico {
          id: string;
          publico?: string;
        }


        export class Tematicas {
          public static tematicas: Tematica[] = [
            // ng-select => peoples
            {
              'id': '1',
             'tematica':'Terror'
            },
            {
              'id': '2',
             'tematica':'Misterio'
            },
            {
              'id': '3',
             'tematica':'Comedia'
            }];
          }
        
            export interface Tematica {
              id: string;
              tematica?: string;
            }


            export class Categorias {
              public static categorias: Categoria[] = [
                // ng-select => peoples
                {
                  'id': '1',
                 'categoria':'Escape Room'
                },
                {
                  'id': '2',
                 'categoria':'Hall Escape'
                },
                {
                  'id': '3',
                 'categoria':'Box'
                }];
              }
            
                export interface Categoria {
                  id: string;
                  categoria?: string;
                }