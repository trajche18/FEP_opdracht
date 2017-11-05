import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeningListComponent } from './lening-list.component';

describe('LeningListComponent', () => {
  let component: LeningListComponent;
  let fixture: ComponentFixture<LeningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeningListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
