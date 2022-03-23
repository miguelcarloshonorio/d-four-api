import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Device } from '../graphql';
import { DeviceService } from './devices.service';
import { DeviceDTO } from './dto/decice.dto';

@Resolver('Device')
export class DeviceResolvers {
  constructor(private readonly deviceService: DeviceService) {}

  @Query(() => [Device])
  async devices() {
    return this.deviceService.findAll();
  }

  @Mutation(() => Device)
  async sendFakeDevicePayload(@Args('input') args: DeviceDTO): Promise<Device> {
    return await this.deviceService.create(args);
  }
}
