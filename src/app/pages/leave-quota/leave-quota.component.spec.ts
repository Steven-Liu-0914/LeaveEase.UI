import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveQuotaComponent } from './leave-quota.component';

describe('LeaveQuotaComponent', () => {
  let component: LeaveQuotaComponent;
  let fixture: ComponentFixture<LeaveQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveQuotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
