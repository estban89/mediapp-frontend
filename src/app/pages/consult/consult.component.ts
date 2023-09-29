import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable } from 'rxjs';
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
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css'],
})
export class ConsultComponent implements OnInit {
  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;

  idPatientSelected: number;
  idMedicSelected: number;
  idSpecialtySelected: number;
  idExamSelected: number;

  minDate: Date = new Date();
  dateSelected: Date;
  diagnosis: string;
  treatment: string;

  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private _snackBar: MatSnackBar,
    private consultService: ConsultService
  ) {}
  ngOnInit(): void {
    this.patients$ = this.patientService.findAll();
    this.medics$ = this.medicService.findAll();
    this.specialties$ = this.specialtyService.findAll();
    this.exams$ = this.examService.findAll();
  }

  changeDate(e: any) {
    console.log(e);
  }

  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.diagnosis;
    det.treatment = this.treatment;

    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.idExamSelected > 0) {
      this.examService.findById(this.idExamSelected).subscribe((data) => this.examsSelected.push(data));
    } else {
      this._snackBar.open('PLEASE ADD AN EXAM!', 'INFO', { duration: 2000 });
    }
  }

  save(){
    const patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    const medic = new Medic();
    medic.idMedic = this.idMedicSelected;

    const specialty = new Specialty();
    specialty.idSpecialty = this.idSpecialtySelected;

    const consult = new Consult();
    consult.patient = patient;
    consult.medic = medic;
    consult.specialty = specialty;
    consult.numConsult = "C1";
    consult.details = this.details;

    /*let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(this.dateSelected.getTime() - tzoffset)).toISOString();*/    

    consult.consultDate = moment(this.dateSelected).format('YYYY-MM-DDTHH:mm:ss')
    
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
   this.idExamSelected = 0;
   this.idPatientSelected = 0;
   this.idMedicSelected = 0;
   this.idSpecialtySelected = 0;
   this.dateSelected = new Date();
   this.diagnosis = null;
   this.treatment = null;
   this.details = []   ;
   this.examsSelected = [];
  }
}
