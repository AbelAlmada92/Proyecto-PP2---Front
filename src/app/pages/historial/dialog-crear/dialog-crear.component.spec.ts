import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearComponent } from './dialog-crear.component';

describe('DialogCrearComponent', () => {
  let component: DialogCrearComponent;
  let fixture: ComponentFixture<DialogCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
