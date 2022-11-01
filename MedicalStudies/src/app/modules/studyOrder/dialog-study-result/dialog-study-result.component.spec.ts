import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStudyResultComponent } from './dialog-study-result.component';

describe('DialogStudyResultComponent', () => {
  let component: DialogStudyResultComponent;
  let fixture: ComponentFixture<DialogStudyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStudyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStudyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
