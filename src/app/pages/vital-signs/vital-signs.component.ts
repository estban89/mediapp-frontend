import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { VitalSigns } from 'src/app/model/vitalSigns';
import { VitalSignsService } from 'src/app/service/vitalSigns.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css'],
})
export class VitalSignsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'patient', 'date', 'pulse', 'actions'];
  dataSource: MatTableDataSource<VitalSigns>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;

  constructor(
    private vitalSignsService: VitalSignsService,
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vitalSignsService.getVitalSignsChange().subscribe((data) => {
      this.createTable(data);
    });
    this.vitalSignsService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
    this.vitalSignsService.listPageable(0, 2).subscribe((data) => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }

  createTable(data: VitalSigns[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  delete(idVitalSigns: number) {
    this.vitalSignsService
      .delete(idVitalSigns)
      .pipe(switchMap(() => this.vitalSignsService.findAll()))
      .subscribe((data) => {
        this.createTable(data);
        this.vitalSignsService.setMessageChange('DELETED!');
      });
  }

  applyFilter(e: any) {
    const filterValue = e.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const patient = data.patient;
      const patientFirstName = patient.firstName.toLowerCase();
      return patientFirstName.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  showMore(e: any) {
    this.vitalSignsService
      .listPageable(e.pageIndex, e.pageSize)
      .subscribe((data) => {
        this.totalElements = data.totalElements;
        this.createTable(data.content);
      });
  }
}
