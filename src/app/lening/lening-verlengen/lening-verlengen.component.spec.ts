import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeningVerlengenComponent } from './lening-verlengen.component';

describe('LeningVerlengenComponent', () => {
  let component: LeningVerlengenComponent;
  let fixture: ComponentFixture<LeningVerlengenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeningVerlengenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeningVerlengenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
