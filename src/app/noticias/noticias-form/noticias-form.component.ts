import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-noticias-form',
  templateUrl: './noticias-form.component.html',
  styleUrls: ['./noticias-form.component.scss']
})
export class NoticiasFormComponent implements OnInit {
  selectedDate: NgbDateStruct;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor() { }

  ngOnInit(): void {
  }
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }
}
