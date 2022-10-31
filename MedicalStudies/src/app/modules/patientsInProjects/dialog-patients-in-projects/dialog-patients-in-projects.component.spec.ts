import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPatientsInProjectsComponent } from './dialog-patients-in-projects.component';

describe('DialogPatientsInProjectsComponent', () => {
  let component: DialogPatientsInProjectsComponent;
  let fixture: ComponentFixture<DialogPatientsInProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPatientsInProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPatientsInProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
