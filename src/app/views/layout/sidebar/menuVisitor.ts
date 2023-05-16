import { MenuItem } from "./menu.model";

export const MENUVISITOR: MenuItem[] = [
  {
    label: "Menu",
    isTitle: true,
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
];
