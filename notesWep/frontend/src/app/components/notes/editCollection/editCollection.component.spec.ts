import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyCollectionComponent } from './editCollection.component';

describe('ModifyCollectionComponent', () => {
  let component: ModifyCollectionComponent;
  let fixture: ComponentFixture<ModifyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});