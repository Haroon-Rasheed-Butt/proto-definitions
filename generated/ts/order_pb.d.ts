// package: example
// file: order.proto

import * as jspb from "google-protobuf";

export class Order extends jspb.Message {
  getOrderId(): number;
  setOrderId(value: number): void;

  getUserId(): string;
  setUserId(value: string): void;

  hasItem(): boolean;
  clearItem(): void;
  getItem(): Order.Item | undefined;
  setItem(value?: Order.Item): void;

  getStatus(): Order.StatusMap[keyof Order.StatusMap];
  setStatus(value: Order.StatusMap[keyof Order.StatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    orderId: number,
    userId: string,
    item?: Order.Item.AsObject,
    status: Order.StatusMap[keyof Order.StatusMap],
  }

  export class Item extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    getPrice(): number;
    setPrice(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Item.AsObject;
    static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Item;
    static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
  }

  export namespace Item {
    export type AsObject = {
      name: string,
      price: number,
    }
  }

  export interface StatusMap {
    PENDING: 0;
    SHIPPED: 1;
    DELIVERED: 2;
  }

  export const Status: StatusMap;
}

