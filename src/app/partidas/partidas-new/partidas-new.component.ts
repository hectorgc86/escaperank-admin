import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partidas-new',
  templateUrl: './partidas-new.component.html',
  styleUrls: ['./partidas-new.component.scss']
})
export class PartidasNewComponent {
  @ViewChild('myModal') myModal: any;

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string|null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE
  ];
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;
  modalRef: NgbModalRef;
  private _dialog: any;

  constructor(private modalService: NgbModal) { 
    this.deviceSelected = null;

   }

  clearResult(): void {
    this.qrResultString = "";
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.closeModal();
  }

  onDeviceSelectChange(event: Event) {
    const selectedStr = (event.target as HTMLSelectElement).value || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selectedStr);
    if (device) {
      this.deviceCurrent = device;
    } else {
      console.error(`Device with id ${selectedStr} not found in available devices list.`);
    }
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }



  

  onHasPermission(has: boolean) {
    this.hasPermission = has;
    }
    
    openInfoDialog() {
      Swal.fire({
        title: 'Información',
        html: `Dispositivos: ${this.hasDevices ? 'Sí' : 'No'}<br>Permiso: ${this.hasPermission ? 'Concedido' : 'Denegado'}`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
  }
    

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
    }
    
    toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
    }
    
    toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
    }
    ngOnInit(): void {
    }
  
    openModal() {
      this.modalRef = this.modalService.open(this.myModal);

    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
    closeModal() {
      if (this.modalRef) {
        this.modalRef.close();
      }
    }

}
