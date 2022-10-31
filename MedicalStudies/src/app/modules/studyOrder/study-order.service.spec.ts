import { TestBed } from '@angular/core/testing';

import { StudyOrderService } from './study-order.service';

describe('StudyOrderService', () => {
  let service: StudyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
