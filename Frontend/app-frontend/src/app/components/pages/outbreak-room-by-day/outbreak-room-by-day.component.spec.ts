import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutbreakRoomByDayComponent } from './outbreak-room-by-day.component';

describe('OutbreakRoomByDayComponent', () => {
  let component: OutbreakRoomByDayComponent;
  let fixture: ComponentFixture<OutbreakRoomByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutbreakRoomByDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutbreakRoomByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
