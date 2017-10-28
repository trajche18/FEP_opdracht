import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeningFormComponent } from './lening-form.component';

describe('LeningFormComponent', () => {
  let component: LeningFormComponent;
  let fixture: ComponentFixture<LeningFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeningFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
