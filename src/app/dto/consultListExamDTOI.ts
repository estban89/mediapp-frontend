import { Consult } from "../model/consult";
import { Exam } from "../model/exam";

export interface ConsultListExamDTOI{
    consult: Consult;
    lstExam: Exam[];
}