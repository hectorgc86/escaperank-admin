import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    label: "Menu",
    isTitle: true,
  },
  {
    label: "Administración",
    icon: "bar-chart-2",
    subItems: [
      {
        label: "Estadísticas",
        link: "/administracion/estadisticas",
      },
      {
        label: "Salas",
        link: "/administracion/salas",
      },
      {
        label: "Noticias",
        link: "/administracion/noticias",
      },
    ],
  },
  {
    label: "Noticias",
    icon: "message-square",
    subItems: [
      {
        label: "Muro",
        link: "/noticias",
      },
    ],
  },
  {
    label: "Salas",
    icon: "film",
    subItems: [
      {
        label: "Explorar",
        link: "/salas",
      },
      {
        label: "Buscar",
        link: "/salas/buscar",
      },
    ],
  },
  {
    label: "Nueva Partida",
    icon: "flag",
    link: "/partidas/nueva",
  },
  {
    label: "Perfil",
    icon: "user",
    link: "/usuarios/:id",
   
  },
];
