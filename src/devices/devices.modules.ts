import { Module } from '@nestjs/common';
import { DeviceResolvers } from './devices.resolvers';
import { DeviceService } from './devices.service';

@Module({
  providers: [DeviceService, DeviceResolvers],
})
export class DeviceModule {}
