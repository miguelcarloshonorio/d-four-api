import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NewDevice {
  @Field()
  id: string;
  @Field()
  message: string;
}

@ObjectType()
export class Device {
  @Field()
  id: string;
  @Field()
  message: string;
}

export abstract class IQuery {
  abstract devices(): Device[] | Promise<Device[]>;
}

export abstract class IMutation {
  abstract sendFakeDevicePayload(input: NewDevice): Device | Promise<Device>;
}

type Nullable<T> = T | null;
