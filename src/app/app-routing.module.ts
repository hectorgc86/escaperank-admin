import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
        path: "dashboard",
        loadChildren: () =>
          import("./views/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
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
      {
        path: "apps",
        loadChildren: () =>
          import("./views/pages/apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "ui-components",
        loadChildren: () =>
          import("./views/pages/ui-components/ui-components.module").then(
            (m) => m.UiComponentsModule
          ),
      },
      {
        path: "advanced-ui",
        loadChildren: () =>
          import("./views/pages/advanced-ui/advanced-ui.module").then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: "form-elements",
        loadChildren: () =>
          import("./views/pages/form-elements/form-elements.module").then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: "advanced-form-elements",
        loadChildren: () =>
          import(
            "./views/pages/advanced-form-elements/advanced-form-elements.module"
          ).then((m) => m.AdvancedFormElementsModule),
      },
      {
        path: "charts-graphs",
        loadChildren: () =>
          import("./views/pages/charts-graphs/charts-graphs.module").then(
            (m) => m.ChartsGraphsModule
          ),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./views/pages/tables/tables.module").then(
            (m) => m.TablesModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/pages/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "general",
        loadChildren: () =>
          import("./views/pages/general/general.module").then(
            (m) => m.GeneralModule
          ),
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },
  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: "Page Not Found",
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: "error/:type",
    component: ErrorPageComponent,
  },
  { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
