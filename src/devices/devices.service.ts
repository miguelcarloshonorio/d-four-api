import { Injectable } from '@nestjs/common';
import { Device } from 'src/graphql';
import { DeviceDTO } from './dto/decice.dto';

@Injectable()
export class DeviceService {
  private readonly devices: Device[] = [];

  findAll(): Device[] {
    return this.devices;
  }

  create(deviceDTO: DeviceDTO): Device {
    this.devices.push(deviceDTO);
    return deviceDTO;
  }
}
