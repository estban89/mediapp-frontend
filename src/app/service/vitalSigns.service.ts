import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { VitalSigns } from '../model/vitalSigns';

@Injectable({
  providedIn: 'root',
})
export class VitalSignsService extends GenericService<VitalSigns> {
  private vitalSignsChange: Subject<VitalSigns[]> = new Subject<VitalSigns[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/vitalsigns`);
  }

  listPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getVitalSignsChange() {
    return this.vitalSignsChange.asObservable();
  }

  setVitalSignsChange(data: VitalSigns[]) {
    this.vitalSignsChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }
}
