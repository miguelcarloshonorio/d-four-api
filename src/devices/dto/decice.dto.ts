import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { NewDevice } from '../../graphql';

@InputType()
export class DeviceDTO extends NewDevice {
  @Field()
  @IsNotEmpty()
  message: string;

  @Field()
  @IsNotEmpty()
  id: string;
}
