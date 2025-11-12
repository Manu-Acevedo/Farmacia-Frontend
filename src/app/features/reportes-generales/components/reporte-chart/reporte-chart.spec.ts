import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteChart } from './reporte-chart';

describe('ReporteChart', () => {
  let component: ReporteChart;
  let fixture: ComponentFixture<ReporteChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
