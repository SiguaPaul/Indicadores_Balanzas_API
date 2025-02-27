import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutbreakRoomComponent } from './outbreak-room.component';

describe('OutbreakRoomComponent', () => {
  let component: OutbreakRoomComponent;
  let fixture: ComponentFixture<OutbreakRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutbreakRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutbreakRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
