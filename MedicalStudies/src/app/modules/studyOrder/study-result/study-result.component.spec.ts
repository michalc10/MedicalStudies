import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResultComponent } from './study-result.component';

describe('StudyResultComponent', () => {
  let component: StudyResultComponent;
  let fixture: ComponentFixture<StudyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
