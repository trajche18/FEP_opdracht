import { TestBed, async, inject } from '@angular/core/testing';

import { BeheerderGuard } from './beheerder.guard';

describe('BeheerderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeheerderGuard]
    });
  });

  it('should ...', inject([BeheerderGuard], (guard: BeheerderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
