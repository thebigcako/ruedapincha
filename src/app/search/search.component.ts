import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchService} from "../shared/search.service";
import {CommonModule, NgIf} from "@angular/common";
import {PressureTableComponent} from "../pressure-table/pressure-table.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PressureTableComponent,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search = '';
  response: any = [];
  loading = false;
  error = null;
  noVehicle = false;

  constructor(protected searchService: SearchService) {
  }

  /**
   * Carga los datos desde la API
   */
  async searchVehicleData() {
    if (!this.search) {
      return;
    }


    // Resetea mensajes de error
    this.response = [];
    this.loading = true;
    this.error = null;

    try {
      // Llama a la API
      this.response = await this.searchService.getTyrePressures(this.search);
    } catch (e: any) {

      // En caso de error, hay que ver si es novh que es vehículo no encontrado.
      if (e.message === 'novh') {
        this.noVehicle = true;
      } else {
        this.error = e.message;
      }
    }

    this.loading = false;

  }
}
