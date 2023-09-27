import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from '../candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-form',
  templateUrl: './verify-form.component.html',
  styleUrls: ['./verify-form.component.css']
})
export class VerifyFormComponent {

  processing: boolean = false;

  constructor(
    private candidateService: CandidateService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  verifyForm = this.formBuilder.group({
    cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]]
  });

  onSubmit(): void {
    let cedula: string | undefined;

    cedula = this.verifyForm.value.cedula?.trim();
    this.processing = true;

    if (cedula && cedula?.length > 0) {
      this.candidateService
        .verifyCedula(cedula)
        .subscribe(e => {
          switch (e.result) {
            case 'Proceso cerrado':
              this.candidateService.candidate = JSON.parse(decodeURI(atob(e.data)));
              alert(`El proceso de preinscripción al PNF en ${this.candidateService.candidate.pnf} ha finalizado.`)
              break;
            case 'Registrado':
              this.candidateService.candidate = JSON.parse(decodeURI(atob(e.data)));
              alert("Ya ha realizado el proceso de preinscripción");
              this.router.navigate(['/registration']);
              break;
            case 'Registrar':
              this.candidateService.candidate = JSON.parse(decodeURI(atob(e.data)));
              alert("Ha sido asignado al PNF en " + this.candidateService.candidate.pnf);
              this.router.navigate(['/pre-registration']);
              break;
            default:
              alert("Cédula no registrada");
          }

          this.processing = false;
          this.verifyForm.reset();
        });
    }
  }
}