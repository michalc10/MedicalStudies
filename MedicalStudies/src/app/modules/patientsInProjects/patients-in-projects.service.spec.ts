import { TestBed } from '@angular/core/testing';

import { PatientsInProjectsService } from './patients-in-projects.service';

describe('PatientsInProjectsService', () => {
  let service: PatientsInProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsInProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
