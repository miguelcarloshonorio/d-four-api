/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewDevice {
    id: string;
    message: string;
}

export class Device {
    id: string;
    message: string;
}

export abstract class IQuery {
    abstract devices(): Device[] | Promise<Device[]>;
}

export abstract class IMutation {
    abstract sendFakeDevicePayload(input: NewDevice): Device | Promise<Device>;
}

type Nullable<T> = T | null;
