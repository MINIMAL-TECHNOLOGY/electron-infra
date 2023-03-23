import { MainEventService } from '@Main/services';
import { BrowserWindow } from 'electron';

export type { RootState, ApplicationDispatch } from '@Renderer/redux/slices';

export type AnyType = string | number | boolean | object | null;

export type AnyPrimitiveType = string | number | boolean | object;

export type AnyObjectType = Object | Set<AnyType> | Array<AnyType>;

// ----------------------------------------------------------------------------------------------------------
export interface IListener {
  name: string;
}

// ----------------------------------------------------------------------------------------------------------
export interface IpcResonse {
  status: string;
  message?: string;
  payload: any;
}

export interface IpcEventOptions<T> {
  topic: string;
  handler: (event: Event, payload: T) => IpcResonse | void | Promise<IpcResonse | void>;
}

export interface IpcInvokeOptions<T> {
  topic: string;
  payload?: T;
}

export interface IpcObserveOptions<T> {
  topic: string;
  payload?: T;
}

export interface IHandler {
  name: string;
  eventHandler: MainEventService;
  handle: () => void;
}

// ----------------------------------------------------------------------------------------------------------
export interface ScreenDefinition {
  name: string;
  title: string;
  sizes: { width: number; height: number; x?: number; y?: number };
  urlPath?: string;
}

export interface WindowInitialState {
  windowId?: string;
  screen: string;
  x?: number;
  y?: number;
  width: number;
  height: number;
  urlPath: string;
  [additions: string]: unknown;
}

export interface WindowContainerElement {
  windowId: string;
  screen: string;
  browserWindow: BrowserWindow;
}

export interface AuthenticationResponse {
  account: string;
  identifier?: string;
  username?: string;
  fullName?: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type OrderType = 'LO' | 'MP' | 'MAK' | 'MOK';
export type OrderClassification = 'EXECUTE' | 'CANCEL' | 'MODIFY' | 'REJECT';

export interface ExecuteOrderRequest {
  account: string;
  accountType: string;
  accountOrderPassword: string;
  symbol: string;
  side: 'B' | 'S';
  price: number;
  volume: number;
  orderType: OrderType;
  periodType: '00' | '01';
  amount: number;
  exchange: string;
}

export interface CancelOrderRequest {
  account: string;
  orderId: string;
  volume: number;
}

export interface ModifyOrderRequest {
  account: string;
  orderId: string;
  price?: number;
  volume?: number;
}

export interface FutureExecuteOrderRequest {
  account: string;
  accountOrderPassword: string;
  symbol: string;
  side: 'B' | 'S';
  price: number;
  volume: number;
  orderType: 'L' | 'M';
  // 0: Future
  // 1: Option
  productType: '0' | '1';
}

export interface InquiryOrderHistoryRequest {
  fromDate: string; // ISO String Date
  toDate: string; // ISO String Date
  account: string;
  symbol?: string;
  side: 'A' | 'B' | 'S';
}

export interface YTTcpQueueAction {
  action: 'enqueue' | 'dequeue';
  topic: string;
  type: string;
  data: YTTcpPayload;
}

export interface YTTcpPayload {
  status: string;
  payload: YTResponseData;
  retry: 0;
}

export interface YTRequestData {
  [key: string | symbol]: any;
}

export interface YTResponseData {
  requestId: number;
  data?: any;
}
