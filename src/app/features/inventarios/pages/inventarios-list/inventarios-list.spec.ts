import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosList } from './inventarios-list';

describe('InventariosList', () => {
  let component: InventariosList;
  let fixture: ComponentFixture<InventariosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventariosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
