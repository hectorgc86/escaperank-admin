import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { BaseComponent } from "./views/layout/base/base.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";
import { LoginActivateGuard } from "./auth/guards/login-activate.guard";
import { LogoutActivateGuard } from "./auth/guards/logout-activate.guard";
const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [LogoutActivateGuard],
  },
  {
    path: "web",
    loadChildren: () => import("./web/web.module").then((m) => m.WebModule),
  },
  {
    path: "",
    component: BaseComponent,
    children: [
      {
        path: "administracion",
        loadChildren: () =>
          import("./administracion/administracion.module").then(
            (m) => m.AdministracionModule
          ),
        canActivate: [LoginActivateGuard],
      },
      {
        path: "noticias",
        loadChildren: () =>
          import("./noticias/noticias.module").then((m) => m.NoticiasModule),
        canActivate: [LoginActivateGuard],
      },
      {
        path: "salas",
        loadChildren: () =>
          import("./salas/salas.module").then((m) => m.SalasModule),
      },
      {
        path: "partidas",
        loadChildren: () =>
          import("./partidas/partidas.module").then((m) => m.PartidasModule),
        canActivate: [LoginActivateGuard],
      },
      {
        path: "usuarios",
        loadChildren: () =>
          import("./usuarios/usuarios.module").then((m) => m.UsuariosModule),
        canActivate: [LoginActivateGuard],
      },
      {
        path: "equipos",
        loadChildren: () =>
          import("./equipos/equipos.module").then((m) => m.EquiposModule),
        canActivate: [LoginActivateGuard],
      },
      { path: "", redirectTo: "/web", pathMatch: "full" },
    ],
  },
  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: "Página no encontrada",
      desc: "Oopps!! La página que buscas no existe.",
    },
  },
  {
    path: "error/:type",
    component: ErrorPageComponent,
  },
  { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top",preloadingStrategy: PreloadAllModules }),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
