// package: example
// file: product.proto

import * as jspb from "google-protobuf";
import * as tag_pb from "./tag_pb";

export class Product extends jspb.Message {
  getProductId(): number;
  setProductId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  clearTagsList(): void;
  getTagsList(): Array<tag_pb.Tag>;
  setTagsList(value: Array<tag_pb.Tag>): void;
  addTags(value?: tag_pb.Tag, index?: number): tag_pb.Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Product.AsObject;
  static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Product;
  static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
  export type AsObject = {
    productId: number,
    name: string,
    description: string,
    price: number,
    tagsList: Array<tag_pb.Tag.AsObject>,
  }
}

