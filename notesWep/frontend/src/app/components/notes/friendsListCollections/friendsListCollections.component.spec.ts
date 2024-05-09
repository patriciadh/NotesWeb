import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendListCollectionsComponent } from './friendsListCollections.component';

describe('FriendListCollectionsComponent', () => {
  let component: FriendListCollectionsComponent;
  let fixture: ComponentFixture<FriendListCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendListCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});