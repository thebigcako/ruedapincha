import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchService} from "../shared/search.service";
import {CommonModule, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ApiConfig} from "../shared/api-config.model";

@Component({
  selector: 'app-api-key-requester',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './api-key-requester.component.html',
  styleUrl: './api-key-requester.component.scss'
})
export class ApiKeyRequesterComponent implements OnInit  {
  apiConfig: ApiConfig = {} as ApiConfig;
  apiKeyStored = false;

  constructor(protected searchService: SearchService, protected router: Router) {

  }

  ngOnInit() {
    this.apiConfig = this.searchService.getApiConfig();
    this.apiKeyStored = this.searchService.apiKeyStored();
  }

  saveApiKey() {
    this.searchService.setApiConfig(this.apiConfig);
    this.apiKeyStored = true;

    this.router.navigate(['/']);
  }

  removeApiKey(): void {
    this.searchService.resetApiKey();
    this.apiKeyStored = false;
    this.apiConfig = {} as ApiConfig;
  }
}
