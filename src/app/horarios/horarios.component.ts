import { Component } from '@angular/core';
import { PNFS } from '../pnfs';
import { SECCIONES } from '../secciones';
import { FormBuilder, Validators } from '@angular/forms';
import { Data } from '../data';
import { HORARIOS } from '../horarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {
  pnfs = PNFS;
  secciones = SECCIONES;
  horarios = HORARIOS;
  trayectosFiltradas: Data[] = [];
  seccionesFiltradas: Number[] = [];
  processing = false;
  buttonSendDisabled = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  horarioForm = this.formBuilder.group({
    pnf: [{ value: '' }, [Validators.required]],
    trayecto: [{ value: '', disabled: true }, [Validators.required]],
    seccion: [{ value: '', disabled: true }, [Validators.required]]
  });

  onSelectionChangePnf(pnf?: string) {
    this.trayectosFiltradas = this.secciones.filter(e => e.value == pnf);

    if (this.trayectosFiltradas.length > 0) {
      this.horarioForm.get('trayecto')?.enable();
    } else {
      this.horarioForm.get('trayecto')?.disable();
    }

    this.horarioForm.get('trayecto')?.setValue('');
  }

  onSelectionChangeTrayecto(pnf?: string, trayecto?: string) {
    let seccion = this.secciones.find(e => e.value == pnf && e.value2 == trayecto);

    if (seccion != undefined) {
      let secciones = Number(seccion.value3);

      for (let s = 1; s <= secciones; s++) {
        this.seccionesFiltradas.push(s);
      }

      this.horarioForm.get('seccion')?.enable();
    } else {
      this.seccionesFiltradas = [];
      this.horarioForm.get('seccion')?.disable();
    }

    this.horarioForm.get('seccion')?.setValue('');
  }

  getUrl(pnf: string, trayecto?: string, seccion?: Number): string {
    let filename = `${pnf} - Trayecto ${trayecto} - Sección ${seccion}.pdf`;
    let horario = this.horarios.find(e => e.value == filename);
    let url: string;

    if (horario != undefined) {
      url = horario.value2;
    } else {
      url = "";
    }

    return url;
  }

  onSubmit(pnf?: string, trayecto?: string, seccion?: string) {
    this.processing = true;
    this.buttonSendDisabled = true;

    if (this.horarioForm.valid) {
      const filename = `${pnf} - Trayecto ${trayecto} - Sección ${seccion}.pdf`;
      const s = this.horarios.find(e => e.value == filename);

      if (s != undefined) {
        window.open(s.value2);
        alert("Archivo descargado exitósamente.")
      }
    } else {
      alert('Se encontraron problemas en uno o mas campos.\nPor favor, revíselos antes de continuar.');
    }

    this.buttonSendDisabled = false;

  }
}
