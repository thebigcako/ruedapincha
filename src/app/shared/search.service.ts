import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {generateText} from "ai";
import {ApiConfig} from "./api-config.model";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  protected apiConfig: ApiConfig = {} as ApiConfig;
  protected groq?: OpenAIProvider;

  constructor() {
    this.loadApiKey();
  }

  apiKeyStored(): boolean {
    return !!this.apiConfig.apiKey;
  }

  setApiConfig(apiConfig: ApiConfig): void
  {
    this.apiConfig = apiConfig;
    window.localStorage.setItem('apiConfig', JSON.stringify(apiConfig));
    this.loadApiKey();
  }

  getApiConfig(): ApiConfig {
    return this.apiConfig;
  }

  resetApiKey(): void {
    this.apiConfig = {} as ApiConfig;
    window.localStorage.removeItem('apiConfig');
  }

  async getTyrePressures(vehicleData: string) {

    if (!this.groq) {
      return null;
    }

    let {text} = await generateText({
      model: this.groq(this.apiConfig.modelName),
      system: "You only return a json array of just integers and don't give any comments",
      prompt: `What are the tyres pressures in psi of front and rear axle of the following vehicle "${vehicleData}" `,
    });

    const pressures = JSON.parse(text.replace(/\n|\r/g, ""));
    const pressuresBar = [];

    for (const pressure of pressures) {
      pressuresBar.push(parseFloat(pressure) * 0.0689476);
    }

    return pressuresBar;
  }

  protected loadApiKey() {
    this.apiConfig = new ApiConfig();

    try {
      const savedApiData = window.localStorage.getItem("apiConfig");

      if (savedApiData) {

        this.apiConfig = JSON.parse(savedApiData) as ApiConfig;

        this.groq = createOpenAI({
          baseURL: 'https://api.groq.com/openai/v1',
          apiKey: this.apiConfig.apiKey,
        });
      }
    } catch (e) {
      this.apiConfig = new ApiConfig();
    }
  }
}
