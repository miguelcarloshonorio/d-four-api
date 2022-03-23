import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Device } from 'src/graphql';
import { DeviceService } from './devices.service';
import { DeviceDTO } from './dto/decice.dto';

@Resolver('Device')
export class DeviceResolvers {
  constructor(private readonly deviceService: DeviceService) {}

  @Query()
  async devices() {
    return this.deviceService.findAll();
  }

  @Mutation()
  async sendFakeDevicePayload(@Args('input') args: DeviceDTO): Promise<Device> {
    return await this.deviceService.create(args);
  }
}
