import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesAdminComponent } from './adminNotes.component';

describe('NotesAdminComponent', () => {
  let component: NotesAdminComponent;
  let fixture: ComponentFixture<NotesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});