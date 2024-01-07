import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemepratureChartComponent } from './temeprature-chart.component';

describe('TemepratureChartComponent', () => {
  let component: TemepratureChartComponent;
  let fixture: ComponentFixture<TemepratureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemepratureChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemepratureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
