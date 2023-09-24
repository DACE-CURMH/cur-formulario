import { Component, OnInit } from '@angular/core';
import { SEXOS } from '../sexos';
import { ESTADOS_CIVILES } from '../estados-civiles';
import { PAISES } from '../paises';
import { Ubicacion } from '../ubicacion';
import { Data } from '../data';
import { CandidateService } from '../candidate.service';
import { TIPO_DISCAPACIDADES } from '../tipo_discapacidad';
import { SI_NO } from '../si_no';
import { NIVELES_ACADEMICOS } from '../niveles_academicos';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Tools } from '../tools';


@Component({
  selector: 'app-pre-registration-form',
  templateUrl: './pre-registration-form.component.html',
  styleUrls: ['./pre-registration-form.component.css']
})
export class PreRegistrationFormComponent extends Tools implements OnInit {
  sexos = SEXOS;
  estadosCiviles = ESTADOS_CIVILES;
  ubicacion = new Ubicacion();
  nacimientoPaises = PAISES;
  nacimientoEstados: Data[] = [];
  direccionEstados = this.ubicacion.getEstados();
  direccionMunicipios: Data[] = [];
  direccionParroquias: Data[] = [];
  si_no: Data[] = SI_NO;
  tipoDiscapacidades: Data[] = TIPO_DISCAPACIDADES;
  nivelesAcademicos: Data[] = NIVELES_ACADEMICOS;
  processing = false;
  regExpAlpha = /^([a-zA-ZñÑáéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙäëïöüÄËÏÖÜäëïöüÄËÏÖÜ ]{0,15})$/
  regExpEmail = /^[a-zA-Z0-9]{1}[\w.-]{0,62}[a-zA-Z0-9]{1}[@]{1}[a-zA-Z0-9]{1}[\w.-]{2,183}[a-zA-Z0-9]{1}[.]{1}[a-zA-Z0-9]{1,}$/;
  buttonSendEnabled = true;

  constructor(
    public candidateService: CandidateService,
    private formBuilder: FormBuilder,
    private router: Router) {
    super();
  }

  preRegistrationForm = this.formBuilder.group({
    nombre1: ['', [Validators.required, Validators.pattern(this.regExpAlpha)]],
    nombre2: ['', [Validators.pattern(this.regExpAlpha)]],
    apellido1: ['', [Validators.required, Validators.pattern(this.regExpAlpha)]],
    apellido2: ['', [Validators.pattern(this.regExpAlpha)]],
    sexo: ['', [Validators.required]],
    estadoCivil: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    lugarNacimientoPais: ['', [Validators.required]],
    lugarNacimientoEstado: [{ value: '', disabled: true }, [Validators.required]],
    telefonoHabitacion: ['', [Validators.pattern(/^(\d{11})$/)]],
    telefonoCelular: ['', [Validators.pattern(/^(\d{11})$/)]],
    correoElectronico: ['', [Validators.pattern(this.regExpEmail), Validators.required]],
    direccionEstado: ['', [Validators.required]],
    direccionMunicipio: [{ value: '', disabled: true }, [Validators.required]],
    direccionParroquia: [{ value: '', disabled: true }, [Validators.required]],
    direccionHabitacion: [{ value: '', disabled: true }, [Validators.required]],
    discapacidad: ['', [Validators.required]],
    tipoDiscapacidad: [{ value: '', disabled: true }, [Validators.required]],
    carnetDiscapacidad: [{ value: '', disabled: true }, [Validators.required]],
    nivelAcademico: ['', [Validators.required]],
    sniRusnies: ['']
  });


  ngOnInit(): void {
    if (this.candidateService.candidate.cedula.trim().length == 0) {
      this.router.navigate(['/verify'])
    }
  }

  getId(id?: number | string): number {
    if (id) {
      return typeof (id) == 'string' ? Number(id) : id;
    } else {
      return 0;
    }
  }

  validate(value: string, regex: RegExp): boolean {
    return regex.test(value);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    let regex = /^(\(\d{4}\)-\d{7})$/g;
    return this.validate(phoneNumber, regex);
  }

  // formatterPhoneNumber(phoneNumber: string): string {
  //   let regexCode = /^(\d{4})$/g;
  //   let _phoneNumber = phoneNumber;

  //   if (regexCode.test(phoneNumber)) {
  //     _phoneNumber += '-';
  //   }

  //   return _phoneNumber;
  // }

  validateEmail(email: string): boolean {
    let regex = /^([\w\d._%+-]+@[\w\d._]+\.[\w]{2,4})$/g;
    return this.validate(email, regex);
  }

  onSelectionChangeNacimientoPais(paisId?: number | string) {
    let id = this.getId(paisId);

    if (id == 242) {
      this.nacimientoEstados = this.ubicacion.getEstados();
    } else {
      this.nacimientoEstados = [];
    }

    if (this.nacimientoEstados.length > 0) {
      this.preRegistrationForm.get('lugarNacimientoEstado')?.enable();
    } else {
      this.preRegistrationForm.get('lugarNacimientoEstado')?.disable();
    }

    this.preRegistrationForm.get('lugarNacimientoEstado')?.setValue('');
  }

  onSelectionChangeDireccionEstado(estadoId?: number | string) {
    let id = this.getId(estadoId);

    this.direccionMunicipios = this.ubicacion.getMunicipios(id);

    if (this.direccionMunicipios.length > 0) {
      this.preRegistrationForm.get('direccionMunicipio')?.enable();
    } else {
      this.preRegistrationForm.get('direccionMunicipio')?.disable();
    }

    this.preRegistrationForm.get('direccionMunicipio')?.setValue('');

  }

  onSelectionChangeDireccionMunicipio(estadoId?: number | string, municipioId?: number | string) {
    let eId = this.getId(estadoId);
    let mId = this.getId(municipioId);

    this.direccionParroquias = this.ubicacion.getParroquias(eId, mId);

    if (this.direccionParroquias.length > 0) {
      this.preRegistrationForm.get('direccionParroquia')?.enable();
    } else {
      this.preRegistrationForm.get('direccionParroquia')?.disable();
    }

    this.preRegistrationForm.get('direccionParroquia')?.setValue('')
  }

  onSelectionChangeDireccionParroquia(parroquiaId?: number | string) {
    let id = this.getId(parroquiaId);

    if (id > 0) {
      this.preRegistrationForm.get('direccionHabitacion')?.enable();
    } else {
      this.preRegistrationForm.get('direccionHabitacion')?.setValue('');
      this.preRegistrationForm.get('direccionHabitacion')?.disable();
    }
  }

  onSelectionChangeDiscapacidad(discapacidadId?: number | string) {
    let id = this.getId(discapacidadId);

    if (id == 1) {
      this.preRegistrationForm.get('tipoDiscapacidad')?.enable();
      this.preRegistrationForm.get('carnetDiscapacidad')?.enable();
    } else {
      this.preRegistrationForm.get('tipoDiscapacidad')?.disable();
      this.preRegistrationForm.get('carnetDiscapacidad')?.disable();
    }

    this.preRegistrationForm.get('tipoDiscapacidad')?.setValue('');
    this.preRegistrationForm.get('carnetDiscapacidad')?.setValue('');
  }

  processData() {
    let sexo = this.sexos.find(e => e.id == Number(this.preRegistrationForm.value.sexo));
    let estadoCivil = this.estadosCiviles.find(e => e.id == Number(this.preRegistrationForm.value.estadoCivil));
    let fechaNacimiento = this.preRegistrationForm.value.fechaNacimiento ? (new Date(`${this.preRegistrationForm.value.fechaNacimiento} 00:00:00`)) : undefined;
    let discapacidad = this.si_no.find(e => e.id == Number(this.preRegistrationForm.value.discapacidad));
    let tipoDiscapacidad = this.tipoDiscapacidades.find(e => e.id == Number(this.preRegistrationForm.value.tipoDiscapacidad));
    let nivelAcademico = this.nivelesAcademicos.find(e => e.id == Number(this.preRegistrationForm.value.nivelAcademico));

    this.candidateService.candidate.nombre1 = this.titlecase(this.preRegistrationForm.value.nombre1);
    this.candidateService.candidate.nombre2 = this.titlecase(this.preRegistrationForm.value.nombre2);
    this.candidateService.candidate.apellido1 = this.titlecase(this.preRegistrationForm.value.apellido1);
    this.candidateService.candidate.apellido2 = this.titlecase(this.preRegistrationForm.value.apellido2);
    this.candidateService.candidate.sexo = sexo ? sexo.value : '';
    this.candidateService.candidate.estadoCivil = estadoCivil ? (sexo?.id == 1 ? (estadoCivil.value2) : (sexo?.id == 2 ? estadoCivil.value3 : estadoCivil.value)) : '';
    this.candidateService.candidate.fechaNacimiento = fechaNacimiento ? fechaNacimiento.toLocaleDateString('es-VE') : '';
    this.candidateService.candidate.nacimientoPais = this.ubicacion.getPais(Number(this.preRegistrationForm.value.lugarNacimientoPais)).value;
    this.candidateService.candidate.nacimientoEstado = this.ubicacion.getEstado(Number(this.preRegistrationForm.value.lugarNacimientoEstado)).value;
    this.candidateService.candidate.telefonoHabitacion = this.preRegistrationForm.value.telefonoHabitacion ? this.phoneFormatter(this.preRegistrationForm.value.telefonoHabitacion) : '';
    this.candidateService.candidate.telefonoCelular = this.preRegistrationForm.value.telefonoCelular ? this.phoneFormatter(this.preRegistrationForm.value.telefonoCelular) : '';
    this.candidateService.candidate.correoElectronico = this.preRegistrationForm.value.correoElectronico ? this.preRegistrationForm.value.correoElectronico.toLowerCase() : '';
    this.candidateService.candidate.direccionEstado = this.ubicacion.getEstado(Number(this.preRegistrationForm.value.direccionEstado)).value;
    this.candidateService.candidate.direccionMunicipio = this.ubicacion.getMunicipio(Number(this.preRegistrationForm.value.direccionMunicipio)).value;
    this.candidateService.candidate.direccionParroquia = this.ubicacion.getParroquia(Number(this.preRegistrationForm.value.direccionParroquia)).value;
    this.candidateService.candidate.direccionHabitacion = this.titlecase(this.preRegistrationForm.value.direccionHabitacion);
    this.candidateService.candidate.discapacidad = discapacidad ? discapacidad.value : '';
    this.candidateService.candidate.tipoDiscapacidad = tipoDiscapacidad ? tipoDiscapacidad.value : '';
    this.candidateService.candidate.carnetDiscapacidad = this.preRegistrationForm.value.carnetDiscapacidad ? this.preRegistrationForm.value.carnetDiscapacidad : '';
    this.candidateService.candidate.nivelAcademico = nivelAcademico ? nivelAcademico.value : '';
    this.candidateService.candidate.sniRusnies = this.preRegistrationForm.value.sniRusnies ? this.preRegistrationForm.value.sniRusnies : '';
  }

  onSubmit() {
    this.processing = true;
    this.buttonSendEnabled = false;

    if (this.preRegistrationForm.valid) {
      this.processData();
      this.candidateService.addCandidate(this.candidateService.candidate)
        .subscribe(
          e => {
            this.candidateService.candidate = JSON.parse(decodeURI(atob(e.data)));
            alert('Proceso de preinscripción completada');
            this.processing = false;
            this.router.navigate(['/registration']);
          });
    }else{
      alert('Se encontraron problemas en uno o mas campos.\nPor favor, revíselos antes de continuar.');
    }

    this.buttonSendEnabled = true;
  }
}