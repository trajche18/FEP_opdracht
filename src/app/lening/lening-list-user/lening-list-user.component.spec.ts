import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeningListUserComponent } from './lening-list-user.component';

describe('LeningListUserComponent', () => {
  let component: LeningListUserComponent;
  let fixture: ComponentFixture<LeningListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeningListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeningListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
