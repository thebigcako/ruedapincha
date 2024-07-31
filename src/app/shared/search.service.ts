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
  protected provider?: OpenAIProvider;

  constructor() {
    this.loadApiKey();
  }

  /**
   * Indica si la api está cargada
   */
  apiKeyStored(): boolean {
    return !!this.apiConfig.apiKey;
  }

  /**
   * Guarda en el localStorage la configuración de la API y carga el proveedor de IA
   * @param apiConfig parámetros de API
   */
  setApiConfig(apiConfig: ApiConfig): void
  {
    this.apiConfig = apiConfig;
    window.localStorage.setItem('apiConfig', JSON.stringify(apiConfig));
    this.loadApiKey();
  }

  /**
   * Devuelve la configuración de la API
   */
  getApiConfig(): ApiConfig {
    return this.apiConfig;
  }

  /**
   * Borra la configuración de la api del localStorage
   */
  resetApiKey(): void {
    this.apiConfig = {} as ApiConfig;
    window.localStorage.removeItem('apiConfig');
  }

  /**
   * Obtenemos la presión de la api
   * @param vehicleData datos del vehículo
   */
  async getTyrePressures(vehicleData: string) {

    // Si no ha cargado datos de la API devuelve error
    if (!this.provider) {
      throw new Error('API no inicializada');
    }

    // Le damos un system prompt para que nos dé o bien el resultado en JSON con las presiones o bien el texto novh indicando que no ha encontrado el vehículo.
    // En caso de devolver un JSON lo más simple que he visto es un array simple de enteros con la presión en PSI.
    // Luego en el componente de la tabla de presiones permite convertirla a distintas unidades.
    let {text} = await generateText({
      model: this.provider(this.apiConfig.modelName),
      system: "You suggest tyre pressures based on owner's manual. If vehicle is found, you only return a json array of just integers and don't give any comments. If vehicle is not found, return 'novh'",
      prompt: `What are the tyres pressures in psi of front and rear axle of the following vehicle "${vehicleData}" `,
    });

    // Si el texto es novh, indica que no ha encontrado el vehículo
    if (text.includes('novh')) {
      throw new Error('novh');
    }

    // Elimina caracteres que JSON.parse no es capaz de procesar. Si devuelve algún error lo capta el componente
    return JSON.parse(text.replace(/\n|\r/g, ""));
  }

  /**
   * Carga los datos de la API desde el localStorage
   * @protected
   */
  protected loadApiKey() {
    this.apiConfig = new ApiConfig('', 'llama-3.1-70b-versatile', 'https://api.groq.com/openai/v1');

    try {
      const savedApiData = window.localStorage.getItem("apiConfig");

      // Si hay datos guardados, inicializa el proveedor de IA.
      if (savedApiData) {

        this.apiConfig = JSON.parse(savedApiData) as ApiConfig;

        this.provider = createOpenAI({
          baseURL: this.apiConfig.url,
          apiKey: this.apiConfig.apiKey,
        });
      }
    } catch (e) {
      // En caso de error la inicializa vacía.
      this.apiConfig = new ApiConfig('', 'llama-3.1-70b-versatile', 'https://api.groq.com/openai/v1');
    }
  }
}
