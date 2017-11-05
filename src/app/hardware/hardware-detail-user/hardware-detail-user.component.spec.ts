import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareDetailUserComponent } from './hardware-detail-user.component';

describe('HardwareDetailUserComponent', () => {
  let component: HardwareDetailUserComponent;
  let fixture: ComponentFixture<HardwareDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
