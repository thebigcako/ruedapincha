import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureTableComponent } from './pressure-table.component';

describe('PressureTableComponent', () => {
  let component: PressureTableComponent;
  let fixture: ComponentFixture<PressureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressureTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
