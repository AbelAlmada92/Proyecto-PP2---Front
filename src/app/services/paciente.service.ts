import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  idPaciente: number;
  nombre?: string | null;
  apellido?: string | null;
  dni: number;
  nLegajo: number;
  obraSocial?: string | null;
  sexoBio: string;
  fechaNacimiento?: string | null;
  grupoSanguineo: string;
  medicacionPrescripta: string;
  domicilio: string;
  telefonoPaciente?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly baseUrl = 'https://localhost:7292';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseUrl}/api/pacientes`);
  }

  getByLegajo(nLegajo: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/api/pacientes/legajo/${nLegajo}`);
  }
}