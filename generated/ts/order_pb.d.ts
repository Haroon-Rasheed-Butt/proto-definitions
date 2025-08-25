// package: example
// file: order.proto

import * as jspb from "google-protobuf";
import * as product_pb from "./product_pb";

export class Order extends jspb.Message {
  getOrderId(): number;
  setOrderId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  clearItemsList(): void;
  getItemsList(): Array<product_pb.Product>;
  setItemsList(value: Array<product_pb.Product>): void;
  addItems(value?: product_pb.Product, index?: number): product_pb.Product;

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
    userId: number,
    itemsList: Array<product_pb.Product.AsObject>,
    status: Order.StatusMap[keyof Order.StatusMap],
  }

  export interface StatusMap {
    PENDING: 0;
    SHIPPED: 1;
    DELIVERED: 2;
  }

  export const Status: StatusMap;
}

