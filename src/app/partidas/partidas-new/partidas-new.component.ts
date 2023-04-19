import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-partidas-new',
  templateUrl: './partidas-new.component.html',
  styleUrls: ['./partidas-new.component.scss']
})
export class PartidasNewComponent {

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
  tryHarder = false;
  private _dialog: any;

  constructor() {
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


  openFormatsDialog() {
    const checkboxTemplate = (name: string, label: string, checked: boolean) =>
    `<label class="swal2-checkbox">
       <input type="checkbox" ${checked ? 'checked' : ''} name="${name}">
       <span>${label}</span>
     </label>`;
  
    const formatsEnabled = this.formatsEnabled;
    const checkboxes = [
      checkboxTemplate('CODE_128', 'CODE_128', formatsEnabled.includes(BarcodeFormat.CODE_128)),
      checkboxTemplate('DATA_MATRIX', 'DATA_MATRIX', formatsEnabled.includes(BarcodeFormat.DATA_MATRIX)),
      checkboxTemplate('EAN_13', 'EAN_13', formatsEnabled.includes(BarcodeFormat.EAN_13)),
      checkboxTemplate('QR_CODE', 'QR_CODE', formatsEnabled.includes(BarcodeFormat.QR_CODE)),
    ].join('');
    Swal.fire({
      title: 'Formatos disponibles',
      html: `<p>Selecciona los formatos que deseas habilitar:</p>
             <div class="swal2-content">
               <div class="swal2-checkbox-wrapper">${checkboxes}</div>
             </div>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedFormats: BarcodeFormat[] = [];
  
        checkboxes.forEach((checkbox) => {
          if ((checkbox as HTMLInputElement).checked) {
            selectedFormats.push((checkbox as HTMLInputElement).name as unknown as BarcodeFormat);
          }
        });
  
        this.formatsEnabled = selectedFormats;
      }
    });
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

}
