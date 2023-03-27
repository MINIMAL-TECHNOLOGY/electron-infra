import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from '@Common/utils/url';

const HTTP = 'http';
const HTTPS = 'https';

interface RequestOptions {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';
  params?: object;
  body?: object;
  configs?: object;
}

// -------------------------------------------------------------
export class NetworkService {
  private name: string;
  private networkRequestWorker: AxiosInstance;

  constructor(name: string, requestConfigs: AxiosRequestConfig) {
    this.name = name;

    console.log(`[NetworkService] Creating new network request worker instance! Name: ${this.name}`);
    this.networkRequestWorker = axios.create({
      ...requestConfigs,
    });
  }

  getProtocol(url: string) {
    return url.startsWith('http:') ? HTTP : HTTPS;
  }

  // -------------------------------------------------------------
  // SEND REQUEST
  // -------------------------------------------------------------
  async send(opts: RequestOptions, logger?: any) {
    const t = new Date().getTime();

    const { url, method = 'get', params, body, configs } = opts;
    const props = {
      url,
      method,
      params,
      data: body,
      paramsSerializer: (p: any) => stringify(p), // eslint-disable-line
      ...configs,
    };

    logger?.info(`[network]][send] URL: ${url} | Props: ${JSON.stringify(props)}`);
    const response = await this.networkRequestWorker.request(props);

    logger?.info(`[network]][send] Took: ${new Date().getTime() - t} ms!`);
    return response;
  }

  // -------------------------------------------------------------
  // GET REQUEST
  // -------------------------------------------------------------
  async get({ url, params, configs, ...rest }) {
    const response = await this.send({ url, method: 'get', params, configs, ...rest });
    return response;
  }

  // -------------------------------------------------------------
  // POST REQUEST
  // -------------------------------------------------------------
  async post({ url, body, configs, ...rest }) {
    const response = await this.send({ url, method: 'post', body, configs, ...rest });
    return response;
  }

  // -------------------------------------------------------------
  async put({ url, body, configs, ...rest }) {
    const response = await this.send({ url, method: 'put', body, configs, ...rest });
    return response;
  }

  // -------------------------------------------------------------
  async patch({ url, body, configs, ...rest }) {
    const response = await this.send({ url, method: 'patch', body, configs, ...rest });
    return response;
  }

  // -------------------------------------------------------------
  async del({ url, configs, ...rest }) {
    const response = await this.send({ url, method: 'delete', configs, ...rest });
    return response;
  }
}
