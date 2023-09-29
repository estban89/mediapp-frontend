import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, first, map, of, switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-vital-signs-dialog',
  templateUrl: './vital-signs-dialog.component.html',
  styleUrls: ['./vital-signs-dialog.component.css'],
})
export class VitalSignsDialogComponent implements OnInit {
  patient: Patient;
  storedPatient: number;
  formPatient: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Patient,
    private _dialogRef: MatDialogRef<VitalSignsDialogComponent>,
    private patientService: PatientService
  ) {
    this.formPatient = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(70),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(70),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(55),
      ]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
    });
  }

  ngOnInit(): void {
    this.patient = { ...this.data };
  }

  operate() {
    if (this.patient != null) {
      this.patientService
        .save(this.patient)
        .pipe(switchMap(() => this.patientService.findAll()))
        .subscribe((data) => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('CREATED!');

          data.forEach((patient) => {
            if (patient.dni.toString() === this.patient.dni.toString()) {
              this.patient.idPatient = patient.idPatient;
              return;
            }
          });
        });
    }
    this.close();
  }

  close() {
    this._dialogRef.close(this.patient);
  }
}
