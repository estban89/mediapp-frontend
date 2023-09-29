import { Patient } from './patient';

export class VitalSigns {
  idVitalSigns: number;
  date: string;
  pulse: string;
  respiratoryRate: string;
  temperature: string;
  patient: Patient;
}
