import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareToevoegenComponent } from './hardware-toevoegen.component';

describe('HardwareToevoegenComponent', () => {
  let component: HardwareToevoegenComponent;
  let fixture: ComponentFixture<HardwareToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
