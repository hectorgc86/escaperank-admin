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

  companyiaRegistro: CompanyiaRequest;
  usuarioRegistro: UsuarioRequest;

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
      nombre: ["", [Validators.required, Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.maxLength(20)]],
      nick: ["", [Validators.required, Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.maxLength(45), Validators.email]],
      telefono: ["", [Validators.required]],
      contrasenya: ["", Validators.required],
      checkCompanyia: [false],
    });

    this.validationForm2 = this.formBuilder.group({
      companyia: ["", [Validators.required, Validators.maxLength(45)]],
      cif: ["", [Validators.required, Validators.pattern(/^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw]\d{7}[\dA-J]$/)]],
      emailCompanyia: ["", [Validators.required, Validators.email]],
      telefonoCompanyia: ["", [Validators.required]],
      web: ["",  [Validators.required, Validators.pattern(/^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]],
      direccion: ["", [this.featureValidator]],
    });

    this.esCompanyia = false;
  }

  get form1() {
    return this.validationForm1.controls;
  }

  get form2() {
    return this.validationForm2.controls;
  }

  featureValidator(control: AbstractControl): { [key: string]: any } | null {
    const feature = control.value as Feature;
    if (!feature || typeof feature !== "object" || !feature.place_name) {
      return { invalidFeature: true };
    }
    return null;
  }

  form1Submit() {
    if (this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }else{
      Object.values(this.validationForm1.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  form2Submit() {
    if (this.validationForm2.valid) {
      this.registrar();
    }else{
      Object.values(this.validationForm2.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  formularioCompleto() {
    alert("Se ha registrado correctamente");
  }

  registrar() {
    this.usuarioRegistro = {
      nick: this.validationForm1.value.nick,
      contrasenya: this.validationForm1.value.contrasenya,
      email: this.validationForm1.value.email,
      nombre:
        this.validationForm1.value.nombre +
        " " +
        this.validationForm1.value.apellidos,
      telefono: this.validationForm1.value.telefono,
      nacido: this.validationForm1.value.nacido,
    };

    if (this.esCompanyia) {
      let provincia = (
        this.direccion.context.find((item) => item.id.startsWith("region."))
          ?.text ?? ""
      )
        .replace("provincia de ", "")
        .replace("Región de ", "");

      this.companyiaRegistro = {
        nombre: this.validationForm2.value.companyia,
        direccion: this.direccion.text,
        email: this.validationForm2.value.emailCompanyia,
        telefono: this.validationForm2.value.telefonoCompanyia,
        web: this.validationForm2.value.web,
        latitud: this.direccion.center[0],
        longitud: this.direccion.center[1],
        numeroLocal: this.direccion.address,
        codigoPostal: this.direccion.context.find((item) =>
          item.id.startsWith("postcode.")
        )?.text,
        ciudad: this.direccion.context.find((item) =>
          item.id.startsWith("place.")
        )?.text,
        provincia: provincia,
      };
    }

    const registroRequest: RegistroRequest = {
      usuario: this.usuarioRegistro,
      companyia: this.companyiaRegistro,
    };

    this.authService.registrar(registroRequest).subscribe({
      next: () => this.wizardForm.goToNextStep(),
      error: (e: any) =>
        Swal.fire({
          icon: "error",
          title: "Error creando registro",
          text: e !== undefined ? e.error.text : "Existen campos no admitidos en formulario",
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
