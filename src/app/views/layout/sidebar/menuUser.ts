import { MenuItem } from "./menu.model";

export const MENUUSER: MenuItem[] = [
  {
    label: "Menu",
    isTitle: true,
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
    link: "/usuarios/:id",
  }
];
