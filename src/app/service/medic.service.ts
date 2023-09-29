import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Medic } from '../model/medic';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic>{

  private medicChange = new Subject<Medic[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/medics`);
  }

    ///////////////////////
    setMedicChange(data: Medic[]){
      this.medicChange.next(data);
    }
  
    getMedicChange(){
      return this.medicChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
