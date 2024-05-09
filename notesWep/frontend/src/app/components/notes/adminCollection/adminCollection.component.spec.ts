import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionAdminComponent } from './adminCollection.component';

describe('CollectionAdminComponent', () => {
  let component: CollectionAdminComponent;
  let fixture: ComponentFixture<CollectionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});