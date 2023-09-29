import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicComponent } from './medic/medic.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { ConsultComponent } from './consult/consult.component';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertGuard } from '../guard/cert.guard';
import { Not403Component } from './not403/not403.component';
import { ProfileComponent } from './profile/profile.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { VitalSignsEditComponent } from './vital-signs/vital-signs-edit/vital-signs-edit.component';
import { VitalSignsDialogComponent } from './vital-signs/vital-signs-dialog/vital-signs-dialog.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CertGuard],
  },
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      { path: 'new', component: PatientEditComponent },
      { path: 'edit/:id', component: PatientEditComponent },
    ],
    canActivate: [CertGuard],
  },
  { path: 'medic', component: MedicComponent, canActivate: [CertGuard] },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    children: [
      { path: 'new', component: SpecialtyEditComponent },
      { path: 'edit/:id', component: SpecialtyEditComponent },
    ],
    canActivate: [CertGuard],
  },
  {
    path: 'exam',
    component: ExamComponent,
    children: [
      { path: 'new', component: ExamEditComponent },
      { path: 'edit/:id', component: ExamEditComponent },
    ],
    canActivate: [CertGuard],
  },
  { path: 'consult', component: ConsultComponent, canActivate: [CertGuard] },
  {
    path: 'consult-autocomplete',
    component: ConsultAutocompleteComponent,
    canActivate: [CertGuard],
  },
  {
    path: 'consult-wizard',
    component: ConsultWizardComponent,
    canActivate: [CertGuard],
  },
  { path: 'search', component: SearchComponent, canActivate: [CertGuard] },
  { path: 'report', component: ReportComponent, canActivate: [CertGuard] },
  { path: 'not-403', component: Not403Component },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'vital-signs',
    component: VitalSignsComponent,
    children: [
      { path: 'new', component: VitalSignsEditComponent },
      { path: 'edit/:id', component: VitalSignsEditComponent },
    ],
    canActivate: [CertGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
