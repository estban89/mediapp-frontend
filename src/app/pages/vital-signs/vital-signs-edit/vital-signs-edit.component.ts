import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, filter, switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { VitalSigns } from 'src/app/model/vitalSigns';
import { PatientService } from 'src/app/service/patient.service';
import { VitalSignsService } from 'src/app/service/vitalSigns.service';
import { VitalSignsDialogComponent } from '../vital-signs-dialog/vital-signs-dialog.component';
import { VitalSignsComponent } from '../vital-signs.component';

@Component({
  selector: 'app-vital-signs-edit',
  templateUrl: './vital-signs-edit.component.html',
  styleUrls: ['./vital-signs-edit.component.css'],
})
export class VitalSignsEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;
  patient: Patient;

  patients$: Observable<Patient[]>;

  minDate: Date = new Date();
  dateSelected: Date;
  valueSelected: number;

  constructor(
    private vitalSignsService: VitalSignsService,
    private patientService: PatientService,
    public route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.patients$ = this.patientService.findAll();
    this.form = new FormGroup({
      idVitalSigns: new FormControl(0),
      date: new FormControl(this.minDate),
      pulse: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(1),
      ]),
      respiratoryRate: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(1),
      ]),
      temperature: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(1),
      ]),
      patient: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.vitalSignsService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idVitalSigns: new FormControl(data.idVitalSigns),
          date: new FormControl(
            moment(data.date).format('YYYY-MM-DDTHH:mm:ss')
          ),
          pulse: new FormControl(data.pulse, [
            Validators.required,
            Validators.minLength(2),
          ]),
          respiratoryRate: new FormControl(data.respiratoryRate, [
            Validators.required,
            Validators.minLength(2),
          ]),
          temperature: new FormControl(data.temperature, [
            Validators.required,
            Validators.maxLength(2),
          ]),
          patient: new FormControl(data.patient.idPatient, [
            Validators.required,
          ]),
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  openDialog(patient?: Patient) {
    const patientDialog = this._dialog.open(VitalSignsDialogComponent, {
      width: '350px',
      data: patient,
    });

    patientDialog.afterClosed().subscribe((data) => {
      if (data) {
        this.patients$ = this.patientService.findAll();
        this.valueSelected = data.idPatient;
      }
    });
  }

  operate() {
    const vitalSigns: VitalSigns = new VitalSigns();
    vitalSigns.idVitalSigns = this.form.value['idVitalSigns'];
    vitalSigns.date = moment(this.dateSelected).format('YYYY-MM-DD');
    vitalSigns.pulse = this.form.value['pulse'];
    vitalSigns.respiratoryRate = this.form.value['respiratoryRate'];
    vitalSigns.temperature = this.form.value['temperature'];

    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['patient'];

    vitalSigns.patient = patient;

    if (this.isEdit) {
      this.vitalSignsService.update(this.id, vitalSigns).subscribe(() => {
        this.vitalSignsService.findAll().subscribe((data) => {
          this.vitalSignsService.setVitalSignsChange(data);
          this.vitalSignsService.setMessageChange('UPDATED!');
        });
      });
    } else {
      this.vitalSignsService
        .save(vitalSigns)
        .pipe(
          switchMap(() => {
            return this.vitalSignsService.findAll();
          })
        )
        .subscribe((data) => {
          this.vitalSignsService.setVitalSignsChange(data);
          this.vitalSignsService.setMessageChange('INSERTED!');
        });
    }

    this.router.navigate(['/pages/vital-signs']);
  }
}
