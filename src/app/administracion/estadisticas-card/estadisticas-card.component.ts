import { Component, Input, OnInit } from '@angular/core';
import { Estadisticas, NumPartidas, PartidasMes } from "../interfaces/estadisticas.interface";

@Component({
  selector: 'app-estadisticas-card',
  templateUrl: './estadisticas-card.component.html',
  styleUrls: ['./estadisticas-card.component.scss']
})
export class EstadisticasCardComponent implements OnInit {
  public customersChartOptions: any = {};
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#b8c3d9",
    cardBg         : "#0c1427",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }
  @Input() numPartida!: NumPartidas;

  constructor() { }

  ngOnInit(): void {
    this.customersChartOptions = convertirDatos(this.numPartida.partidasMes);

  }
/**
 * Customerse chart options
 */
}
function getCustomerseChartOptions(obj: any) {
  return {
    series: [{
      name: '',
      data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
    }],
    chart: {
      type: "line",
      height: 60,
      sparkline: {
        enabled: !0
      }
    },
    colors: [obj.primary],
    xaxis: {
      type: 'datetime',
      categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    markers: {
      size: 0
    },
  }
};

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  chart: {
    type: string;
    height: number;
    sparkline: {
      enabled: boolean;
    };
  };
  colors: string[];
  xaxis: {
    type: string;
    categories: string[];
  };
  stroke: {
    width: number;
    curve: string;
  };
  markers: {
    size: number;
  };
}

function convertirDatos(datos: PartidasMes[]): ChartData {
  const data: number[] = [];
  const categories: string[] = [];
  let nombreSala: string = "";
  datos.forEach((dato) => {
    const mesAnio = `${dato.mes}-${dato.anio}`;
    categories.push(mesAnio);
    data.push(dato.cantidad_partidas);
    nombreSala = dato.nombre_sala;
  });

  return {
    series: [
      {
        name: nombreSala,
        data: data,
      },
    ],
    chart: {
      type: "line",
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#000000"],
    xaxis: {
      type: "string",
      categories: categories
    },
    stroke: {
      width: 1,
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
  };
}