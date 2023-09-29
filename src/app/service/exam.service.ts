import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Exam } from '../model/exam';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam> {

  private examChange = new Subject<Exam[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/exams`);
  }

    ///////////////////////
    setExamChange(data: Exam[]){
      this.examChange.next(data);
    }
  
    getExamChange(){
      return this.examChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
