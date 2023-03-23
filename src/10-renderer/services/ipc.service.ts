import { IpcRenderer } from 'electron';
import { IpcEventOptions, IpcInvokeOptions } from '@Common/types';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    stuff: string;
  }
}

// -------------------------------------------------------------------
class RendererEventService {
  private static instance: RendererEventService;

  constructor(private ipcRenderer: IpcRenderer) {}

  static getInstance(): RendererEventService {
    if (!this.instance) {
      this.instance = new RendererEventService(window.ipcRenderer);
    }

    return this.instance;
  }

  subscribe<T>(opts: IpcEventOptions<T>) {
    const { topic, handler } = opts;
    this.ipcRenderer.on(topic, handler);
  }

  invoke<T>(opts: IpcInvokeOptions<T>) {
    const { topic, payload } = opts;
    return this.ipcRenderer.invoke(topic, payload);
  }

  removeListeners(topic: string) {
    this.ipcRenderer.removeAllListeners(topic);
  }
}

// -------------------------------------------------------------------
export { RendererEventService };
