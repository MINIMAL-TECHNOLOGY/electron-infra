import { Urls } from '@Common/constants';
import { BaseNetworkRequest } from '@Common/services/base-network-request.service';

const NAME = 'QTS';
const ENV = (process.env.NODE_ENV || 'development').toUpperCase();
console.log(ENV);

const RequestMethods: Record<string | symbol, 'get' | 'post' | 'put' | 'patch' | 'options' | 'delete'> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  OPTIONS: 'options',
  DELETE: 'delete',
};

export class QTSNetworkService extends BaseNetworkRequest {
  private static instance: QTSNetworkService;
  public authorization = '';

  constructor() {
    super(NAME, {
      baseURL: Urls[ENV].QTS_API_ENDPOINT,
    });
    console.info(`[QTSNetworkRequest] New instance with BASE URL: ${this.baseURL as string}`);
  }

  // ----------------------------------------------------------------------------------
  static getInstance(): QTSNetworkService {
    if (!this.instance) {
      this.instance = new QTSNetworkService();
    }
    return this.instance;
  }

  // ----------------------------------------------------------------------------------
  async login(opts: { loginId: string; password: string }): Promise<any> {
    const { loginId, password } = opts;

    const url = '/v1/api/Users/login';
    const rs = await this.networkService.send({
      url,
      method: RequestMethods.POST,
      body: { loginId, password, rememberMe: true },
    });

    return rs?.data;
  }

  // ----------------------------------------------------------------------------------
  async getAlgorithmStocks(opts: { algorithmId: string; condition: any }): Promise<any> {
    const url = '/v1/api/TsStocks/algorithm/stocks';
    const rs = await this.networkService.send({
      url,
      method: RequestMethods.GET,
      params: { filter: JSON.stringify(opts) },
      configs: {
        headers: {
          authorization: this.authorization,
        },
      },
    });

    return rs?.data;
  }

  // ----------------------------------------------------------------------------------
  async getStockSnapshots(opts: { symbols: Array<string> }): Promise<any> {
    const { symbols } = opts;
    if (!symbols?.length) {
      return [];
    }

    const url = '/v1/api/TsMarkets/stock/latest';
    const rs = await this.networkService.send({
      url,
      method: RequestMethods.GET,
      params: {
        filter: JSON.stringify({ symbols, market: 'KR' }),
        compress: 'disable',
      },
      configs: {
        headers: {
          authorization: this.authorization,
        },
      },
    });

    return rs?.data;
  }
}
