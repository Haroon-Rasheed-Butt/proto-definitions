// package: example
// file: user.proto

import * as jspb from "google-protobuf";
import * as order_pb from "./order_pb";
import * as user_profile_pb from "./user_profile_pb";

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getIsActive(): boolean;
  setIsActive(value: boolean): void;

  hasUserProfile(): boolean;
  clearUserProfile(): void;
  getUserProfile(): user_profile_pb.UserProfile | undefined;
  setUserProfile(value?: user_profile_pb.UserProfile): void;

  clearOrdersList(): void;
  getOrdersList(): Array<order_pb.Order>;
  setOrdersList(value: Array<order_pb.Order>): void;
  addOrders(value?: order_pb.Order, index?: number): order_pb.Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    userProfile?: user_profile_pb.UserProfile.AsObject,
    ordersList: Array<order_pb.Order.AsObject>,
  }
}

