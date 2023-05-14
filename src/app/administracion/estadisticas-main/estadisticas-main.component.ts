import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import {
  Estadisticas,
  NumPartidas,
  PartidasMes,
  Ranking,
  Tiempos,
} from "../interfaces/estadisticas.interface";
import { EstadisticasService } from "../services/estadisticas.service";

@Component({
  selector: "app-estadisticas-main",
  templateUrl: "./estadisticas-main.component.html",
  styleUrls: ["./estadisticas-main.component.scss"],
  preserveWhitespaces: true,
})
export class EstadisticasMainComponent implements OnInit {
  public customersChartOptions: any = {};
  public ordersChartOptions: any = {};
  public growthChartOptions: any = {};
  public revenueChartOptions: any = {};
  public monthlySalesChartOptions: any = {};
  public cloudStorageChartOptions: any = {};

  // colors and font variables for apex chart
  obj = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#b8c3d9",
    cardBg: "#0c1427",
    fontFamily: "'Roboto', Helvetica, sans-serif",
  };

  /**
   * NgbDatepicker
   */
  currentDate: NgbDateStruct;
  estadisticas: Estadisticas;
  numPartidas: NumPartidas[];
  tiempos: Tiempos[];
  rankings: Ranking[];
  partidasMes: PartidasMes[];

  isLoading: boolean;

  constructor(
    private calendar: NgbCalendar,
    private estadisticasService: EstadisticasService,
  ) {}
  ngOnInit(): void {

    this.isLoading = true;

    this.estadisticasService
      .getEstadisticasCompanyia(localStorage.getItem("companyiaId")!)
      .subscribe((estadisticas) => {
        this.estadisticas = estadisticas;
        this.partidasMes = estadisticas.partidasMes;
        this.tiempos = estadisticas.tiempos;
        this.rankings = estadisticas.rankings;
        this.numPartidas = actualizarNumPartidas(
          estadisticas.numPartidas,
          estadisticas.partidasMes
        );
        this.isLoading = false;
      });

    this.currentDate = this.calendar.getToday();

    // Some RTL fixes. (feel free to remove if you are using LTR))
    if (document.querySelector("html")?.getAttribute("dir") === "rtl") {
      this.addRtlOptions();
    }
  }

  /**
   * Only for RTL (feel free to remove if you are using LTR)
   */
  addRtlOptions() {
    // Revenue chart
    this.revenueChartOptions.yaxis.labels.offsetX = -25;
    this.revenueChartOptions.yaxis.title.offsetX = -75;

    //  Monthly sales chart
    this.monthlySalesChartOptions.yaxis.labels.offsetX = -10;
    this.monthlySalesChartOptions.yaxis.title.offsetX = -70;
  }
}

function actualizarNumPartidas(
  numPartidas: NumPartidas[],
  partidasMes: PartidasMes[]
): NumPartidas[] {
  const numPartidasActualizado = [...numPartidas];

  for (const partidaMes of partidasMes) {
    const index = numPartidasActualizado.findIndex(
      (numPartida) => numPartida.nombre === partidaMes.nombre_sala
    );
    if (index !== -1) {
      if (numPartidasActualizado[index].partidasMes == undefined) {
        numPartidasActualizado[index].partidasMes = [];
      }
      numPartidasActualizado[index].partidasMes.push(partidaMes);
    }
  }

  return numPartidasActualizado;
}
