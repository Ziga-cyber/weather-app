import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayForecastCardComponent } from './day-forecast-card.component';

describe('DayForecastCardComponent', () => {
  let component: DayForecastCardComponent;
  let fixture: ComponentFixture<DayForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayForecastCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
