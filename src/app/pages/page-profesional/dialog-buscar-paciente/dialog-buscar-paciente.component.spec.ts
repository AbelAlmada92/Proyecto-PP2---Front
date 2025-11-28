import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuscarPacienteComponent } from './dialog-buscar-paciente.component';

describe('DialogBuscarPacienteComponent', () => {
  let component: DialogBuscarPacienteComponent;
  let fixture: ComponentFixture<DialogBuscarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBuscarPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBuscarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
