import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { WizardComponent as BaseWizardComponent } from "angular-archwizard";
import { MapComponent } from "ngx-mapbox-gl";
import { MapboxService } from "../services/mapbox.service";
import { AuthService } from "src/app/auth/services/auth.service";
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from "rxjs";
import Swal from "sweetalert2";
import { Perfil } from "src/app/usuarios/interfaces/perfil.interface";
import { CompanyiaRequest } from "src/app/salas/interfaces/companyia.interface";
import { RegistroRequest } from "../interfaces/registro.interface";
import { UsuarioRequest } from "../../usuarios/interfaces/usuario.interface";
import { Feature } from "../interfaces/mapbox.interface";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  validationForm1: UntypedFormGroup;
  validationForm2: UntypedFormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  companyiaRegistro: CompanyiaRequest;
  usuarioRegistro: UsuarioRequest;
  perfilRegistro: Perfil;

  esCompanyia: Boolean;

  direccion: Feature;

  @ViewChild("wizardForm") wizardForm: BaseWizardComponent;
  @ViewChild("map") map: MapComponent;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private mapboxService: MapboxService
  ) {}

  ngOnInit(): void {
    this.validationForm1 = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      nick: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.max]],
      contrasenya: ["", Validators.required],
      checkCompanyia: [false],
    });

    this.validationForm2 = this.formBuilder.group({
      companyia: ["", [Validators.required]],
      cif: ["", Validators.required],
      emailCompanyia: ["", [Validators.required, Validators.email]],
      telefonoCompanyia: ["", [Validators.required, Validators.max]],
      web: ["", Validators.required],
      direccion: ["", [this.featureValidator]],
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

    this.esCompanyia = false;
  }

  featureValidator(control: AbstractControl): { [key: string]: any } | null {
    const feature = control.value as Feature;
    if (!feature || typeof feature !== "object" || !feature.place_name) {
      return { invalidFeature: true };
    }
    return null;
  }

  get form1() {
    return this.validationForm1.controls;
  }

  get form2() {
    return this.validationForm2.controls;
  }

  form1Submit() {
    if (this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  form2Submit() {
    if (this.validationForm2.valid) {
      this.registrar();
    }
    this.isForm2Submitted = true;
  }

  formularioCompleto() {
    alert("Successfully Completed");
  }

  registrar() {
    this.perfilRegistro = {
      nombre:
        this.validationForm1.value.nombre +
        " " +
        this.validationForm1.value.apellidos,
      telefono: this.validationForm1.value.telefono,
      numeroPartidas: 0,
      partidasGanadas: 0,
      partidasPerdidas: 0,
      avatar: "default.png",
      nacido: this.validationForm1.value.nacido,
    };

    this.usuarioRegistro = {
      nick: this.validationForm1.value.nick,
      contrasenya: this.validationForm1.value.contrasenya,
      email: this.validationForm1.value.email,
      perfil: this.perfilRegistro,
    };

    if (this.esCompanyia) {
      this.companyiaRegistro = {
        nombre: this.validationForm2.value.companyia,
        direccion: this.direccion.place_name,
        email: this.validationForm2.value.emailCompanyia,
        telefono: this.validationForm2.value.telefonoCompanyia,
        web: this.validationForm2.value.web,
        tripAdvisor: "",
        facebook: "",
        latitud: this.direccion.center[0],
        longitud: this.direccion.center[1],
        numeroLocal: this.direccion.address,
        googleMaps: null,
        numeroOpiniones: "0",
        codigoPostal: this.direccion.context[0].text,
        instagram: "",
        puntuacion: "0",
        rango: "",
      };
    }

    const registroRequest: RegistroRequest = {
      usuario: this.usuarioRegistro,
      companyia: this.companyiaRegistro,
      ciudad: this.direccion.context[2].text,
      provincia: this.direccion.context[3].text,
    };

    this.authService.registrar(registroRequest).subscribe({
      next: () => this.wizardForm.goToNextStep(),
      error: () =>
        Swal.fire({
          icon: "error",
          title: "Error creando registro",
          text: "Existen campos no admitidos en formulario",
        }),
    });
  }

  validarEsCompanyia(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target !== null) {
      this.esCompanyia = target.checked;
    }
  }

  buscar = (texto$: Observable<string>) => {
    return texto$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term.length < 2) {
          return of([]);
        } else {
          return this.mapboxService
            .buscar(term)
            .pipe(map((features: Feature[]) => features));
        }
      }),
      map((results) => results.map((result) => result))
    );
  };

  formatter = (d: { place_name: string }) => d.place_name;
}
