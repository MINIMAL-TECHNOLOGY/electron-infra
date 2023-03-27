import { AxiosRequestConfig } from 'axios';
import { NetworkService } from './network.service';

const DEFAULT_PROPS = {
  withCredentials: true,
  timeout: 60 * 1000,
};

const DEFAULT_HEADERS = {
  // Accept: '*/*',
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
};

export abstract class BaseNetworkRequest {
  protected baseURL: string;
  protected networkService: NetworkService;

  constructor(name: string, props: AxiosRequestConfig) {
    const { headers = {}, ...rest } = props;
    const networkServiceProps = {
      ...rest,
      ...DEFAULT_PROPS,
      validateStatus: (status: number) => {
        return status < 500;
      },
      headers: { ...headers, ...DEFAULT_HEADERS },
    };
    this.baseURL = props?.baseURL || '';
    this.networkService = new NetworkService(name, networkServiceProps);
  }
}
