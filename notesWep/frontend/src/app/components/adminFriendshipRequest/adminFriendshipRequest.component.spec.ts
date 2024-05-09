import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFriendRequestComponent } from './adminFriendshipRequest.component';

describe('AdminFriendRequestComponent', () => {
  let component: AdminFriendRequestComponent;
  let fixture: ComponentFixture<AdminFriendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFriendRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFriendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});