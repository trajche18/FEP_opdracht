import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeningDetailUserComponent } from './lening-detail-user.component';

describe('LeningDetailUserComponent', () => {
  let component: LeningDetailUserComponent;
  let fixture: ComponentFixture<LeningDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeningDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeningDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
