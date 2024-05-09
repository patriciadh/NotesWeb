import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSendRequestComponent } from './adminSendRequest.component';

describe('AdminSendRequestComponent', () => {
  let component: AdminSendRequestComponent;
  let fixture: ComponentFixture<AdminSendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSendRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});