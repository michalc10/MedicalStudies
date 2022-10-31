import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStudyOrderComponent } from './dialog-study-order.component';

describe('DialogStudyOrderComponent', () => {
  let component: DialogStudyOrderComponent;
  let fixture: ComponentFixture<DialogStudyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStudyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStudyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
