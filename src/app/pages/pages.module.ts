import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultComponent } from './consult/consult.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { ExamComponent } from './exam/exam.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicComponent } from './medic/medic.component';
import { PatientComponent } from './patient/patient.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { RandomComponent } from './login/forgot/random/random.component';
import { ProfileComponent } from './profile/profile.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { VitalSignsEditComponent } from './vital-signs/vital-signs-edit/vital-signs-edit.component';
import { VitalSignsDialogComponent } from './vital-signs/vital-signs-dialog/vital-signs-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        PdfViewerModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        PatientComponent,
        MedicComponent,
        PatientEditComponent,
        ExamComponent,
        ExamEditComponent,
        SpecialtyComponent,
        SpecialtyEditComponent,
        ConsultComponent,
        ConsultAutocompleteComponent,
        ConsultWizardComponent,
        SearchComponent,
        SearchDialogComponent,
        ReportComponent,
        LayoutComponent,
        DashboardComponent,
        Not403Component,
        Not404Component,
        ForgotComponent,
        RandomComponent,
        ProfileComponent,
        VitalSignsComponent,
        VitalSignsEditComponent,
        VitalSignsDialogComponent,
        //Not403Component,
        //Not404Component,
        //ForgotComponent,
        //RandomComponent,
    ],
    providers: [],
})
export class PagesModule { }
