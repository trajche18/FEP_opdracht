import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareListUserComponent } from './hardware-list-user.component';

describe('HardwareListUserComponent', () => {
  let component: HardwareListUserComponent;
  let fixture: ComponentFixture<HardwareListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
