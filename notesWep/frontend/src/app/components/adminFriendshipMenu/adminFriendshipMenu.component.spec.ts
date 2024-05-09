// Unit test for the AdminFriendMenuComponent class.
// It verifies the functionality of the AdminFriendMenuComponent.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFriendMenuComponent } from './adminFriendshipMenu.component';

describe('AdminFriendMenuComponent', () => {
  let component: AdminFriendMenuComponent; // Instance of the AdminFriendMenuComponent.
  let fixture: ComponentFixture<AdminFriendMenuComponent>; // Fixture for testing.

  // Asynchronous setup before each test.
  beforeEach(async () => {
    // Configure TestBed with necessary components and modules.
    await TestBed.configureTestingModule({
      declarations: [ AdminFriendMenuComponent ] // Declare AdminFriendMenuComponent for testing.
    })
    .compileComponents(); // Compile the components for testing.

    // Create a fixture for the AdminFriendMenuComponent.
    fixture = TestBed.createComponent(AdminFriendMenuComponent);
    // Get the component instance from the fixture.
    component = fixture.componentInstance;
    // Trigger change detection to initialize the component.
    fixture.detectChanges();
  });

  // Test case: should create
  it('should create', () => {
    // Assertion: Verify that the component is truthy (i.e., exists).
    expect(component).toBeTruthy();
  });
});