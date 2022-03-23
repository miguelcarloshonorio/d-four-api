import { IsNotEmpty } from 'class-validator';
import { NewDevice } from 'src/graphql';

export class DeviceDTO extends NewDevice {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  id: string;
}
