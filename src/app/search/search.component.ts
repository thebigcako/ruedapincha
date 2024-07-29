import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchService} from "../shared/search.service";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search = '';
  response: any = [];
  loading = false;
  error = null;

  constructor(protected searchService: SearchService) {
  }

  async searchVehicleData() {
    if (!this.search) {
      return;
    }

    this.response = '';
    this.loading = true;

    try {
      this.response = await this.searchService.getTyrePressures(this.search);
    } catch (e: any) {
      this.error = e.message;
    }

    this.loading = false;

  }
}
