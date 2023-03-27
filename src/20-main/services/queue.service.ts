import omit from 'lodash/omit';

export class QueueService {
  private queueData: Record<string, any>;

  constructor() {
    this.queueData = {};
  }

  enqueue(queue: string, value: any) {
    if (!this.queueData[queue]) {
      this.queueData[queue] = [];
    }

    this.queueData[queue].push(value);
  }

  dequeue(queue: string) {
    const value = this.queueData[queue]?.shift();
    return value;
  }

  getElementAt(queue: string, position = 0) {
    return this.queueData[queue][position];
  }

  getQueue(queue: string) {
    return this.queueData[queue];
  }

  removeQueue(queue: string) {
    this.queueData = omit(this.queueData, [queue]);
  }

  mapData() {
    return this.queueData;
  }
}
