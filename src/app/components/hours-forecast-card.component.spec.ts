import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursForecastCardComponent } from './hours-forecast-card.component';

describe('HoursForecastCardComponent', () => {
  let component: HoursForecastCardComponent;
  let fixture: ComponentFixture<HoursForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursForecastCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoursForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
