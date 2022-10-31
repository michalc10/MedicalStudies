import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsInProjectsComponent } from './patients-in-projects.component';

describe('PatientsInProjectsComponent', () => {
  let component: PatientsInProjectsComponent;
  let fixture: ComponentFixture<PatientsInProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsInProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsInProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
