import type { AxiosInstance } from 'axios'

export class BaseApiGateway {
  protected readonly httpClient: AxiosInstance

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient
  }
}
