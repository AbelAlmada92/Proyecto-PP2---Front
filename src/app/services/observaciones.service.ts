import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PacienteLite {
  idPaciente: number;
  nombre?: string | null;
  apellido?: string | null;
  dni?: number;
  nLegajo?: number;
}

export interface MedicoLite {
  idMedico: number;
  nombre?: string | null;
  apellido?: string | null;
  matricula?: string | null;
  especialidad?: string | null;
}

export interface Observacion {
  idObservacion: number;
  idPaciente: number;
  textoObservacion: string;
  fechaObservacion: string;
  idMedico: number;

  paciente?: PacienteLite | null;
  medico?: MedicoLite | null;
}

export interface UpdateObservacionRequest {
  textoObservacion: string;

  idPaciente?: number;
  idMedico?: number;
  fechaObservacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {
  private readonly baseUrl = 'https://localhost:7292';

  constructor(private http: HttpClient) {}

  getByPacienteId(idPaciente: number): Observable<Observacion[]> {
    return this.http.get<Observacion[]>(
      `${this.baseUrl}/api/observaciones/paciente/${idPaciente}`
    );
  }

  getById(idObservacion: number): Observable<Observacion> {
    return this.http.get<Observacion>(
      `${this.baseUrl}/api/observaciones/${idObservacion}`
    );
  }

  updateTexto(idObservacion: number, body: UpdateObservacionRequest): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/api/observaciones/${idObservacion}`,
      body
    );
  }
}