import { TestBed, inject } from '@angular/core/testing';

import { HardwareService } from './hardware.service';

describe('HardwareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HardwareService]
    });
  });

  it('should be created', inject([HardwareService], (service: HardwareService) => {
    expect(service).toBeTruthy();
  }));
});
