import { Component, OnInit, ViewChild } from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
import { BehaviorSubject } from "rxjs";
import Swal from "sweetalert2";
import {
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { PartidasService } from "../services/partidas.service";
import { Equipo } from "src/app/equipos/interfaces/equipo.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";
import { Usuario } from "src/app/usuarios/interfaces/usuario.interface";

@Component({
  selector: "app-partidas-new",
  templateUrl: "./partidas-new.component.html",
  styleUrls: ["./partidas-new.component.scss"],
})
export class PartidasNewComponent implements OnInit {
  @ViewChild("modalQR") modalQR: any;

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

    this.usuariosService
      .getEquiposUsuario(this.usuario.id)
      .subscribe((equipos) => {
        this.equipos = equipos;
        this.equipoSeleccionado = equipos[0];
      });
  }

  validar() {
    this.modalRef = this.modalService.open(this.modalQR);
  }

  guardar() {}

  camposCompletos(): boolean {
    return !!this.equipoSeleccionado && !!this.fechaPartida && !!this.horaPartida && !!this.minutosPartida && !!this.segundosPartida;
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
    this.closeModal();
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
}
