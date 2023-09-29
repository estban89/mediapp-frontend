import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { FilterConsultDTO } from 'src/app/dto/filterConsultDTO';
import { Consult } from 'src/app/model/consult';
import { ConsultService } from 'src/app/service/consult.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  
  form: FormGroup;
  dataSource: MatTableDataSource<Consult>
  displayedColumns = ['patient', 'medic', 'specialty', 'date', 'actions'];

  @ViewChild('tab') tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private consultService: ConsultService,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      dni: new FormControl(),
      fullname: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  search(){
    if(this.tabGroup.selectedIndex == 0){
      //Option 1
      const dni = this.form.value['dni'];
      const fullname = this.form.value['fullname'];

      const dto = new FilterConsultDTO(dni, fullname);

      this.consultService.searchOthers(dto).subscribe(data => {
        this.createTable(data);
      });

    }else{
      //Option 2
      let date1 = this.form.value['startDate'];
      let date2 = this.form.value['endDate'];

      date1 = moment(date1).format('YYYY-MM-DDTHH:mm:ss');
      date2 = moment(date2).format('YYYY-MM-DDTHH:mm:ss');

      this.consultService.searchByDates(date1, date2).subscribe(data => this.createTable(data));
    }
  }

  createTable(data : Consult[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(consult: Consult){
    this._dialog.open(SearchDialogComponent, {
      width: '750px',
      data: consult
    })
  }

}
