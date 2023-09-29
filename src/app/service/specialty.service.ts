import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Specialty } from '../model/specialty';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty>{

  private specialtyChange = new Subject<Specialty[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialties`);
  }

    ///////////////////////
    setSpecialtyChange(data: Specialty[]){
      this.specialtyChange.next(data);
    }
  
    getSpecialtyChange(){
      return this.specialtyChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
