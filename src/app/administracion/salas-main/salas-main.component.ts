import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Sala } from "src/app/salas/interfaces/sala.interface";
import { ImageUtils } from "src/app/utils/image-utils";
import { SalasService } from "../services/salas.service";

@Component({
  selector: "app-salas-main",
  templateUrl: "./salas-main.component.html",
  styleUrls: ["./salas-main.component.scss"],
})
export class SalasMainComponent implements OnInit {
  @ViewChild("myModal") myModal: any;
  imageUtils = ImageUtils;
  selectedSalaId = "";
  selectedSalaNombre = "";
  salas: Sala[];
  modalRef: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salasService: SalasService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.salasService
      .getSalasCompanyia(localStorage.getItem("companyiaId")!)
      .subscribe((salas) => {
        this.salas = salas;
        console.log(this.salas);
      });
  }
  nuevaSala() {
    this.router.navigate(["administracion/salas/nueva"]);
  }

  openModal(sala: Sala) {
    this.selectedSalaId = sala.id as string;
    this.selectedSalaNombre = sala.nombre as string;

    this.modalRef = this.modalService.open(this.myModal);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  saveAsImage(parent: any) {
    let parentElement = null;
    parentElement = parent.qrcElement.nativeElement;

    if (parentElement) {
      const canvas = document.createElement("canvas");

      // get bounding rectangle of the "p" element
      let text = "";
      const pElement = document.getElementById(
        "nombreSala"
      ) as HTMLParagraphElement;
      if (pElement) {
        text = pElement.textContent ?? "";
        const pRect = pElement.getBoundingClientRect();

        // set canvas size to fit the QR code and the "p" element
        const parentRect = parentElement.getBoundingClientRect();
        canvas.width = parentRect.height;
        canvas.height = parentRect.height + pRect.height + pRect.height;

        // get canvas context
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // draw QR code onto the canvas
          const qrCanvas = parentElement.querySelector("canvas");
          ctx.drawImage(
            qrCanvas,
            0,
            0,
            parentRect.height,
            parentRect.height + pRect.height
          );

          // draw "p" element onto the canvas
          const pStyle = getComputedStyle(pElement);
          ctx.font = pStyle.fontSize + " " + pStyle.fontFamily;
          ctx.fillStyle = pStyle.color;
          ctx.textAlign = "center";
          ctx.fillText(
            text,
            parentRect.height / 2,
            parentRect.height + pRect.height / 2
          );

          // convert canvas to image
          const dataUrl = canvas.toDataURL("image/png");
          const blobData = this.convertBase64ToBlob(dataUrl);

          // save as image
          const blob = new Blob([blobData], { type: "image/png" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "Qrcode.png";
          link.click();
        } else {
          console.error("Failed to get 2D context for canvas");
        }
      } else {
        console.error("Failed to get 'nombreSala' element");
      }
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,");
    // hold the content type
    const imageType = parts[0].split(":")[1];
    // decode base64 string
    const decodedData = window.atob(parts[1]);
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }
}
