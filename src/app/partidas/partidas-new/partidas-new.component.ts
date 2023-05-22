import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import Swal from "sweetalert2";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { PartidasService } from "../services/partidas.service";
import { Equipo } from "src/app/equipos/interfaces/equipo.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";
import { Usuario } from "src/app/usuarios/interfaces/usuario.interface";
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Partida } from "../interfaces/partida.interface";

@Component({
  selector: "app-partidas-new",
  templateUrl: "./partidas-new.component.html",
  styleUrls: ["./partidas-new.component.scss"],
})
export class PartidasNewComponent implements OnInit {
  @ViewChild("modalQR") modalQR: any;
  @ViewChild("modalFoto") modalFoto: any;
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = false;
  isCameraExist = true;
  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  webcamImage: WebcamImage | undefined;
  
  
  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string | null;

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  hasDevices: boolean;
  hasPermission: boolean;

  resultadoValidacionQR: string;

  modalRef: NgbModalRef;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;
  

  botonValidarActivado: boolean;
  botonGuardarActivado: boolean;
  segundosPartida: string;
  minutosPartida: string;
  fechaPartida: string;
  fechaMaxima: string;
  horaPartida: string;

  equipos: Equipo[];
  equipoSeleccionado: Equipo;
  usuario: Usuario;

  constructor(
    private modalService: NgbModal,
    private usuariosService: UsuariosService,
    private partidasService: PartidasService
  ) {
    this.deviceSelected = null;
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);

    this.botonValidarActivado = false;
    this.botonGuardarActivado = false;
    this.minutosPartida = "60";
    this.segundosPartida = "00";

    const fechaActual = new Date();

    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    this.fechaMaxima = fechaActual.toISOString().substring(0, 10);
    this.fechaPartida = fechaActual.toISOString().substring(0, 10);
    this.horaPartida = new Date(0, 0, 0, hora, minutos).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    });


    this.usuariosService
      .getEquiposUsuario(this.usuario.id)
      .subscribe((equipos) => {
        this.equipos = equipos;
        this.equipoSeleccionado = equipos[0];
      });
  }

  hacerFoto(event: Event) {
    this.showWebcam =true;
    //this.modalRef = this.modalService.open(this.modalFoto);
  }

  validar() {
    this.modalRef = this.modalService.open(this.modalQR);
  }

  camposCompletos(): boolean {
    return (
      !!this.equipoSeleccionado &&
      !!this.fechaPartida &&
      !!this.horaPartida &&
      !!this.minutosPartida &&
      !!this.segundosPartida
    );
  }

  clearResult(): void {
    this.resultadoValidacionQR = "";
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.resultadoValidacionQR = resultString;
    const partida: Partida={
      fecha: this.fechaPartida,
      minutos:this.minutosPartida,
      segundos:this.segundosPartida,
      imagen:this.webcamImage?.imageAsBase64,
      salaId:this.resultadoValidacionQR,
      equipoId:this.equipoSeleccionado.id
    }
    this.savePartida(partida);
    this.closeModal();
  }


    savePartida(partidaCreada: Partida) {
      var promise = new Promise<boolean>((resolve, reject) => {
        let result: boolean;
        this.partidasService.addPartida(partidaCreada).subscribe({
          next: (sala) => {
            location.assign('/administracion/companyias');
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
            console.log('Partida creada');
            result = true;
            resolve(result);
          },
        });
      });
      return promise;
    }
  
  onDeviceSelectChange(event: Event) {
    const selectedStr = (event.target as HTMLSelectElement).value || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(
      (x) => x.deviceId === selectedStr
    );
    if (device) {
      this.deviceCurrent = device;
    } else {
      console.error(
        `Device with id ${selectedStr} not found in available devices list.`
      );
    }
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    Swal.fire({
      title: "Información",
      html: `Dispositivos: ${this.hasDevices ? "Sí" : "No"}<br>Permiso: ${
        this.hasPermission ? "Concedido" : "Denegado"
      }`,
      icon: "info",
      confirmButtonText: "Aceptar",
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

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }


  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    this.webcamImage = webcamImage;
    this.showWebcam =false;
    //this.closeModal();

  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
