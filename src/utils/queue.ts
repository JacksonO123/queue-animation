import errors from "./errors";

export default class Queue<T> {
  private capacity: number;
  private head: number;
  private tail: number;
  private size: number;
  private arr: T[];

  constructor(size: number, defaultValue: T) {
    this.capacity = size;
    this.head = this.tail = -1;
    this.size = 0;
    this.arr = Array(size).fill(defaultValue);
  }

  getArr() {
    return this.arr;
  }

  enqueue(value: T) {
    if (this.isFull()) {
      errors.distributeError("Queue overflow");
      return;
    }

    if (this.head === -1) {
      this.head = this.tail = 0;
      this.arr[this.head] = value;
      this.size++;
      return;
    }

    if (this.tail < this.capacity - 1) this.tail++;
    else this.tail = 0;

    this.arr[this.tail] = value;

    this.size++;
  }

  dequeue() {
    const value = this.arr[this.head];

    if (this.isEmpty()) {
      errors.distributeError("Queue underflow");
      return null;
    } else if (this.size === 1) {
      this.head = this.tail = -1;
      this.size--;
      return value;
    }

    if (this.head < this.capacity - 1) this.head++;
    else this.head = 0;

    this.size--;

    return value;
  }

  getFront() {
    return this.head;
  }

  getBack() {
    return this.tail;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }
}
