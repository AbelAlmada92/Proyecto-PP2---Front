import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfesionalComponent } from './page-profesional.component';

describe('PageProfesionalComponent', () => {
  let component: PageProfesionalComponent;
  let fixture: ComponentFixture<PageProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageProfesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
