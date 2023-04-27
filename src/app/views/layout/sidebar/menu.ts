import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    label: "EscapeRank",
    isTitle: true,
  },
  {
    label: "Autenticación",
    icon: "unlock",
    subItems: [
      {
        label: "Login",
        link: "/auth/login",
      },
      {
        label: "Registro",
        link: "/auth/registro",
      },
    ],
  },
  {
    label: "Administración",
    icon: "pie-chart",
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
    label: "Partidas",
    icon: "upload",
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
      {
        label: "Amigos",
        link: "/usuarios/:id/amigos",
      },
    ],
  }
];
