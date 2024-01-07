import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherCardComponent } from './current-weather-card.component';

describe('CurrentWeatherCardComponent', () => {
  let component: CurrentWeatherCardComponent;
  let fixture: ComponentFixture<CurrentWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
