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
    label: "Partidas",
    icon: "flag",
    subItems: [
      {
        label: "Listado",
        link: "/partidas/",
      },
      {
        label: "Nueva",
        link: "/partidas/nueva",
      },
    ],
  },
  {
    label: "Usuarios",
    icon: "user",
    subItems: [
      {
        label: "Perfil",
        link: "/usuarios/:id",
      },
    ],
  },
];
