// package: example
// file: user_profile.proto

import * as jspb from "google-protobuf";

export class UserProfile extends jspb.Message {
  getProfileId(): number;
  setProfileId(value: number): void;

  getBio(): string;
  setBio(value: string): void;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserProfile.AsObject;
  static toObject(includeInstance: boolean, msg: UserProfile): UserProfile.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserProfile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserProfile;
  static deserializeBinaryFromReader(message: UserProfile, reader: jspb.BinaryReader): UserProfile;
}

export namespace UserProfile {
  export type AsObject = {
    profileId: number,
    bio: string,
    avatarUrl: string,
    userId: number,
  }
}

