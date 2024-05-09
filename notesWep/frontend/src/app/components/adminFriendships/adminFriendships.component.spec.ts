import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFriendshipComponent } from './adminFriendships.component';

describe('AdminFriendshipComponent', () => {
  let component: AdminFriendshipComponent;
  let fixture: ComponentFixture<AdminFriendshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFriendshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFriendshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});