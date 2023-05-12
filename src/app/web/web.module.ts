import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMainComponent } from './web-main/web-main.component';
import { ContactComponent } from './contact/contact.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { PricingComponent } from './pricing/pricing.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { WebRoutingModule } from "./web-routing.module";
import { PropietariosComponent } from './propietarios/propietarios.component';

@NgModule({
  declarations: [
    WebMainComponent,
    ServicesComponent, PropietariosComponent,PricingComponent, FeaturesComponent, TeamComponent, ContactComponent, ScrollspyDirective, FooterComponent
  ],
  imports: [
    CommonModule, ScrollToModule.forRoot(),
    NgbModalModule,WebRoutingModule
  ],
  exports: [ServicesComponent, PropietariosComponent,PricingComponent, FeaturesComponent, TeamComponent, ContactComponent, ScrollspyDirective, FooterComponent]
})
export class WebModule { }