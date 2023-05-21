import { MenuItem } from "./menu.model";

export const MENUADMIN: MenuItem[] = [
  {
    label: "Menu",
    isTitle: true,
  },
  {
    label: "Administración",
    icon: "bar-chart-2",
    subItems: [
      {
        label: "Compañías",
        link: "/administracion/companyias",
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
    label: "Nueva partida",
    icon: "flag",
    link: "/partidas/nueva",
  },
  {
    label: "Perfil",
    icon: "user",
    link: "/usuarios/perfil",
   
  },
];
