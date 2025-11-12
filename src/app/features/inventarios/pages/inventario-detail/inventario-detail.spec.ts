import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDetail } from './inventario-detail';

describe('InventarioDetail', () => {
  let component: InventarioDetail;
  let fixture: ComponentFixture<InventarioDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
