import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { ConsultListExamDTOI } from 'src/app/dto/consultListExamDTOI';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ConsultService } from 'src/app/service/consult.service';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css'],
})
export class ConsultWizardComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];

  minDate: Date = new Date();

  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  medicSelected: Medic;
  consults: number[] = [];
  consultSelected: number;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      patient: [new FormControl(), Validators.required],
      specialty: [new FormControl(), Validators.required],
      exam: [new FormControl(), Validators.required],
      consultDate: [new FormControl(new Date()), Validators.required],
      diagnosis: new FormControl('', [Validators.required]),
      treatment: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = this._formBuilder.group({});

    this.loadInitialData();
  }

  loadInitialData() {
    this.patientService.findAll().subscribe((data) => (this.patients = data));
    this.medicService.findAll().subscribe((data) => (this.medics = data));
    this.specialtyService
      .findAll()
      .subscribe((data) => (this.specialties = data));
    this.examService.findAll().subscribe((data) => (this.exams = data));

    for (let i = 1; i <= 100; i++) {
      this.consults.push(i);
    }
  }

  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.firstFormGroup.value['exam'] != null) {
      this.examsSelected.push(this.firstFormGroup.value['exam']);
    } else {
      this._snackBar.open('Please select an exam', 'INFO', { duration: 2000 });
    }
  }

  selectMedic(medic: Medic) {
    this.medicSelected = medic;
  }

  selectConsult(consultNumber: number) {
    this.consultSelected = consultNumber;
  }

  nextManualStep() {
    if (this.consultSelected > 0) {
      this.stepper.next();
    } else {
      this._snackBar.open('Please select a consult number', 'INFO', {
        duration: 2000,
      });
    }
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  save() {
    const consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient'];
    consult.medic = this.medicSelected;
    consult.specialty = this.firstFormGroup.value['specialty'];
    consult.numConsult = `C${this.consultSelected}`;
    consult.details = this.details;
    consult.consultDate = moment(this.firstFormGroup.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

    const dto: ConsultListExamDTOI = {
      consult: consult,
      lstExam: this.examsSelected
    };

    this.consultService.saveTransactional(dto).subscribe( ()=> {
      this._snackBar.open('CREATED!', 'INFO', {duration: 2000});

      setTimeout( ()=> {
        this.cleanControls();
      }, 2000);
    });    
  }

  cleanControls(){
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
    this.details = [];
    this.examsSelected = [];
    this.consultSelected = 0;
    this.medicSelected = null;
  }
}
