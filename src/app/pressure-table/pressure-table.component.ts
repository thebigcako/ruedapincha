import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-pressure-table',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './pressure-table.component.html',
  styleUrl: './pressure-table.component.scss'
})
export class PressureTableComponent {
  @Input() pressures: number[] = [];

  unit = 'psi';

  /**
   * Factor conversión PSI a BARES
   */
  PSI_BAR= 0.0689476;

  constructor() {
    const unit = window.localStorage.getItem('unit');

    if (unit) {
      this.unit = unit;
    }
  }

  /**
   * Adapta la tabla de valores en función de las presiones recibidas
   */
  get pressuresValues() {
    const pressures = {
      front: 0,
      rear: 0,
      valid: false
    }

    // Si las presiones son válidas, las configura
    if (this.pressures?.length >= 2) {
      pressures.front = this.pressures[0];
      pressures.rear = this.pressures[1];
      pressures.valid = true;

      // Las presiones vienen en PSI, si no, hay qeu convertirlas
      if (this.unit != 'psi') {
        pressures.front *= this.PSI_BAR;
        pressures.rear *= this.PSI_BAR;

        // Kilopascales es bares * 100
        if (this.unit == 'kpa') {
          pressures.front = Math.round(pressures.front * 100);
          pressures.rear = Math.round(pressures.rear * 100);
        }
      }
    }

    return pressures;
  }

  /**
   * Establece y guarda la unidad en el localStorage
   * @param unit unidad
   */
  setUnit(unit: string) {
    this.unit = unit;
    window.localStorage.setItem('unit', unit);
  }
}
