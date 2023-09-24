import { Component, OnInit } from '@angular/core';
import { UNIDADES } from '../unidades';
import { RECAUDOS } from '../recaudos';
import { Unidad } from '../unidad';
import { CandidateService } from '../candidate.service';
import { Router } from '@angular/router';
import { Candidate } from '../candidate';
import { Tools } from '../tools';

declare var pdfMake: any;

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent extends Tools implements OnInit {
  private unidades = UNIDADES;
  private recaudos = RECAUDOS;
  trayecto = 'INICIAL';
  periodo = '2023-2'

  constructor(
    public candidateService: CandidateService,
    private router: Router) {
    super();
    
    if (this.candidateService.candidate.cedula.trim().length == 0) {
      this.router.navigate(['/verify']);
    }
  }

  ngOnInit(): void {

  }

  createPdf(): any {
    let membrete = `REPÚBLICA BOLIVARIANA DE VENEZUELA
MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA
MINISTERIO DEL PODER POPULAR PARA EL PROCESO SOCIAL DE TRABAJO
INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES
DIRECCIÓN GENERAL DE SALUD
COLEGIO UNIVERSITARIO DE REHABILITACIÓN MAY HAMILTON
SUBDIRECCIÓN ACADÉMICA
DIVISIÓN DE ADMISIÓN Y CONTROL DE ESTUDIOS`;
    let title: string;
    let unidades: Unidad[];
    let totalUC: number = 0;
    let datosInscripcion = [];
    let heightsRecaudos: number[] = [];
    let recaudoId: number = 0;
    let recaudos: any[] = [];
    let content: any;
    let lugarNacimiento: string;
    let nombreCompleto: string;
    let pnf;
    let direccion;

    title = `PLANILLA DE INSCRIPCIÓN ${this.candidateService.candidate.pnf.toUpperCase()}
    TRAYECTO ${this.trayecto} ${this.periodo}`;
    unidades = this.unidades.filter(e => e.pnf.toUpperCase() == this.candidateService.candidate.pnf.toUpperCase());
    datosInscripcion = [
      [{ text: 'DATOS ACADÉMICOS', style: 'key', colSpan: 5 }, {}, {}, {}, {}],
      [
        { text: 'CÓDIGO', style: 'key' },
        { text: 'UNIDADES EXPLORATORIAS', style: 'key' },
        { text: 'U.C.', style: 'key' },
        { text: 'TRAYECTO', style: 'key' },
        { text: 'SECCIÓN', style: 'key' }
      ]
    ];
    unidades.forEach(e => {
      datosInscripcion.push([
        { text: e.codigo.toUpperCase(), style: 'value', alignment: 'right' },
        { text: e.unidad.toUpperCase(), style: 'value' },
        { text: e.unidadCredito.toString(), style: 'value' },
        { text: e.trayecto.toUpperCase(), style: 'value' },
        { text: '', style: 'value' }
      ]);
      totalUC += e.unidadCredito;
    });
    datosInscripcion.push([
      { text: 'TOTAL UNIDADES INSCRITAS', style: 'key', colSpan: 2 },
      {},
      { text: totalUC.toString(), style: 'value', colSpan: 1 },
      { text: '', style: 'key', colSpan: 2 },
      {}
    ]);
    this.recaudos
      .filter(e => e.value2.trim().length == 0 || e.value2.trim().toLowerCase().includes(this.candidateService.candidate.pnf.trim().toLowerCase()))
      .forEach(e => {
        recaudoId++;
        recaudos.push([
          { text: recaudoId.toString(), alignment: 'center', fontSize: 12 },
          { text: e.value, alignment: 'left', fontSize: 12 },
          {}
        ]);
        heightsRecaudos.push(20);
      });
    lugarNacimiento = `${this.candidateService.candidate.nacimientoPais}. ${this.candidateService.candidate.nacimientoEstado ? (this.candidateService.candidate.nacimientoEstado + '.') : ''}`;
    nombreCompleto = `${this.candidateService.candidate.nombre1} ${this.candidateService.candidate.nombre2} ${this.candidateService.candidate.apellido1} ${this.candidateService.candidate.apellido2}`;
    pnf = `PNF en ${this.candidateService.candidate.pnf}`;
    direccion = `${this.candidateService.candidate.direccionEstado}. ${this.candidateService.candidate.direccionMunicipio}. ${this.candidateService.candidate.direccionParroquia}. ${this.candidateService.candidate.direccionHabitacion}`;

    content = {
      pageSize: 'FOLIO',
      pageMargins: [15, 15, 15, 20],
      footer: {
        columns: [
          { text: "RL/rl\n23/09/2023", fontSize: 8, alignment: 'left', margin: [20, 0, 0, 0] }]
      },
      content: [
        {
          style: 'table',
          table: {
            headerRows: 0,
            widths: [80, '*', 60, 75],
            body: [
              [
                { alignment: 'left', width: 90, image: 'logoIvss', border: [false, false, false, false] },
                { text: membrete, fontSize: 9, alignment: 'center', bold: true, border: [false, false, false, false] },
                { alignment: 'right', width: 60, image: 'logoCur', border: [false, false, false, false] },
                { text: '\n\n\n\nFOTO', fontSize: 8, bold: true, alignment: 'center' }]
            ]
          }
        },
        { text: title, style: 'title' },
        { text: `FECHA: ${this.candidateService.candidate.fechaInscripcion}`, alignment: 'right', fontSize: 9, bold: true },
        {
          style: 'table',
          table: {
            headerRows: 0,
            widths: ['*', '*', '*', '*'],

            body: [
              [{ text: 'DATOS PERSONALES', style: 'key', colSpan: 4 }, {}, {}, {}],
              [
                { text: 'PRIMER NOMBRE', style: 'key' },
                { text: 'SEGUNDO NOMBRE', style: 'key' },
                { text: 'PRIMER APELLIDO', style: 'key' },
                { text: 'SEGUNDO APELLIDO', style: 'key' }],
              [
                { text: this.titlecase(this.candidateService.candidate.nombre1), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.nombre2), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.apellido1), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.apellido2), style: 'value' }],
              [
                { text: 'CÉDULA DE IDENTIDAD', style: 'key' },
                { text: 'SEXO', style: 'key' },
                { text: 'ESTADO CIVIL', style: 'key' },
                { text: 'FECHA DE NACIMIENTO', style: 'key' }],
              [
                { text: this.titlecase(this.candidateService.candidate.cedula), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.sexo), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.estadoCivil), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.fechaNacimiento), style: 'value' }],
              [
                { text: 'LUGAR DE NACIMIENTO', style: 'key' },
                { text: 'TELÉFONO CELULAR', style: 'key' },
                { text: 'TELEFONO HABITACIÓN', style: 'key' },
                { text: 'CORREO ELECTRÓNICO', style: 'key' }],
              [
                { text: this.titlecase(lugarNacimiento), style: 'value' },
                { text: this.candidateService.candidate.telefonoCelular, style: 'value' },
                { text: this.candidateService.candidate.telefonoHabitacion, style: 'value' },
                { text: this.candidateService.candidate.correoElectronico, style: 'value' }],
              [{ text: 'DIRECCIÓN DE HABITACIÓN', style: 'key', colSpan: 4 }, {}, {}, {}],
              [{ text: this.titlecase(direccion), style: 'value', colSpan: 4 }, {}, {}, {}],
              [
                { text: '¿TIENE DISCAPACIDAD?', style: 'key' },
                { text: 'INDIQUE EL TIPO DE DISCAPACIDAD', style: 'key', colSpan: 2 }, {},
                { text: 'CARNET DE DISCAPACIDAD', style: 'key' }],
              [
                { text: this.titlecase(this.candidateService.candidate.discapacidad), style: 'value' },
                { text: this.titlecase(this.candidateService.candidate.tipoDiscapacidad), style: 'value', colSpan: 2 }, {},
                { text: this.titlecase(this.candidateService.candidate.carnetDiscapacidad), style: 'value' }],
              [{ text: 'DATOS ACADÉMICOS', style: 'key', colSpan: 4 }, {}, {}, {}],
              [
                { text: 'NIVEL ACADÉMICO', style: 'key', colSpan: 3 }, {}, {},
                { text: 'NÚMERO SNI', style: 'key' }],
              [
                { text: this.titlecase(this.candidateService.candidate.nivelAcademico), style: 'value', colSpan: 3 }, {}, {},
                { text: this.candidateService.candidate.sniRusnies.toUpperCase(), style: 'value' }],
              [{ text: 'PARA USO DE LA DIVISIÓN DE ADMSIÓN Y CONTROL DE ESTUDIOS', style: 'key', colSpan: 4 }, {}, {}, {}],
              [{ text: ' ', style: 'value', colSpan: 4 }, {}, {}, {}],
            ]
          }
        },
        {
          style: 'table',
          table: {
            headerRows: 0,
            widths: [100, '*', 18, 46, 40],
            body: datosInscripcion,
          }
        },
        {
          style: 'table',
          table: {
            headerRows: 0,
            widths: ['*', '*'],
            heights: ['auto', 50],
            body: [
              [{ text: ' ', style: 'value', rowSpan: 2 }, { text: 'PARA USO DE LA DIVISION DE ADMISIÓN Y CONTROL DE ESTUDIOS', style: 'key' }],
              [{ text: ' ', style: 'value' }, { text: ' ', style: 'value', rowSpan: 1 }],
              [{ text: 'FIRMA DEL ESTUDIANTE', style: 'key' }, { text: 'FIRMA, FECHA Y SELLO DE CONTROL DE ESTUDIOS ', style: 'key' }],
              [{ text: 'VÁLIDO COMO CONSTANCIA DE INSCRIPCIÓN AL SER RECIBIDO, SELLADO Y FIRMADO POR CONTROL DE ESTUDIOS', style: 'key', colSpan: 2 }, {}]
            ]
          }
        },
        { text: '', pageBreak: 'after' },
        {
          style: 'table',
          table: {
            headerRows: 0,
            widths: [80, '*', 80],
            body: [
              [
                { alignment: 'left', width: 90, image: 'logoIvss', border: [false, false, false, false] },
                { text: membrete, fontSize: 9, alignment: 'center', bold: true, border: [false, false, false, false] },
                { alignment: 'right', width: 60, image: 'logoCur', border: [false, false, false, false] }
              ]
            ]
          }
        },
        { text: 'LISTA DE CHEQUEO DE REQUISITOS', style: 'title', decoration: 'underline' },
        {
          style: 'table',
          margin: [0, 20, 0, 100],
          table: {
            headerRows: 0,
            widths: [20, '*', 20],
            heights: heightsRecaudos,
            body: recaudos,
          }
        },
        { 
          table: {
            headerRows: 0,
            widths: [50, "auto", 25, "auto", 50],
            body: [
              [{ text: '', border: [false, false, false, false]},
              { text: 'Sello y firma del funcionario receptor\nDACE', alignment: 'center' ,border: [false, !false, false, false]},
              { text: '', border: [false, false, false, false]},
              { text: 'Sello y firma del funcionario receptor\nSubdirección Administrativa', alignment: 'center', border: [false, !false, false, false]},
              { text: '', border: [false, false, false, false]}]
            ]
          }
        },
        { text: '', pageBreak: 'after' },
        { text: 'ETIQUETAS', style: 'title', decoration: 'underline', lineHeight: 1.5 },
        { text: 'Recorte y pegue las etiquetas en una carpeta marrón tamaño oficio.', style: 'title', lineHeight: 2 },
        {
          table: {
            headerRows: 0,
            widths: [300],
            body: [
              [{ text: 'Etiqueta #1', alignment: 'center', bold: true, border: [false, false, false, true] }],
              [{ text: nombreCompleto.toUpperCase(), alignment: 'center', bold: true }]
            ]
          }
        },
        { text: ' ', lineHeight: 2 },
        {
          table: {
            headerRows: 0,
            widths: [50, 25, 25],
            body: [
              [{ text: 'Etiqueta #2', alignment: 'center', bold: true, border: [false, false, false, true], colSpan: 3 }, {}, {}],
              [
                { text: this.candidateService.candidate.cedula.slice(0, -4), alignment: 'center', bold: true },
                { text: this.candidateService.candidate.cedula.slice(-4, -2), alignment: 'center', bold: true },
                { text: this.candidateService.candidate.cedula.slice(-2), alignment: 'center', bold: true }
              ]
            ]
          }
        },
        { text: ' ', lineHeight: 2 },
        {
          table: {
            headerRows: 0,
            widths: [300],
            body: [
              [{ text: 'Etiqueta #3', alignment: 'center', bold: true, border: [false, false, false, true] }],
              [{ text: pnf, alignment: 'center', bold: true }]
            ]
          }
        },
        { text: ' ', lineHeight: 2 },
        {
          table: {
            headerRows: 0,
            widths: [50, 25, 25],
            body: [
              [{ text: 'Etiqueta #4', alignment: 'center', bold: true, border: [false, false, false, true], colSpan: 3 }, {}, {}],
              [
                { text: this.candidateService.candidate.cedula.slice(0, -4), alignment: 'center', bold: true },
                { text: this.candidateService.candidate.cedula.slice(-4, -2), alignment: 'center', bold: true },
                { text: this.candidateService.candidate.cedula.slice(-2), alignment: 'center', bold: true }
              ]]
          }
        },
        { text: '', pageBreak: 'after' },
        { text: 'UBICACIÓN DE LAS ETIQUETAS', style: 'title', decoration: 'underline', lineHeight: 1.5 },
        { text: '(No es necesario que imprima esta página).', style: 'title', lineHeight: 5 },
        { alignment: 'center', width: 500, image: 'carpeta' }
      ],
      styles: {
        title: {
          fontSize: 14,
          alignment: 'center',
          bold: true
        },
        key: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          fillColor: '#b7b7b7'
        },
        value: {
          fontSize: 9,
          alignment: 'center'
        },
        table: {
          margin: [0, 0, 0, 4]
        }
      },
      images: {
        carpeta: 'https://i.ibb.co/Jpzy4J6/carpeta-oficio.png',
        logoIvss: 'https://i.ibb.co/N3GSJn7/LOGO-IVSS-ILLUSTRATOR.png',
        logoCur: 'https://i.ibb.co/gFQwC6D/cur.png'
      }
    };

    return pdfMake.createPdf(content);
    // return window.pdfMake.createPdf(content);
  }

  downloadPdf(): void {
    let filename = `PLANILLA - ${this.candidateService.candidate.pnf.toUpperCase()} - ${this.candidateService.candidate.cedula}`;
    this.createPdf().download(filename);
  }

  openPdf(): void {
    this.createPdf().open();
  }

  reset() {
    this.candidateService.candidate = new Candidate();
    this.router.navigate(['/verify']);
  }
}