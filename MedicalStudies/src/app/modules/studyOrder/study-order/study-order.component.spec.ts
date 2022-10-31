import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOrderComponent } from './study-order.component';

describe('StudyOrderComponent', () => {
  let component: StudyOrderComponent;
  let fixture: ComponentFixture<StudyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
