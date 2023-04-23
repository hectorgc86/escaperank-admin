import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";

import { LayoutModule } from "./views/layout/layout.module";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { BaseUrlInterceptor } from "./interceptors/base-url.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthGuard } from "./core/guard/auth.guard";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapBoxToken,
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
