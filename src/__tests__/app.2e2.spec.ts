import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { DeviceModule } from '../../src/devices/devices.modules';
import { ApolloDriver } from '@nestjs/apollo';

describe('Device test (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          driver: ApolloDriver,
        }),
        DeviceModule,
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('success on sendFakeDevicePayloadQuery', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'sendFakeDevicePayload',
        query: `mutation sendFakeDevicePayload {
            sendFakeDevicePayload(input:{
              id: "someID"
              message:"some message"
            }), {
              id, 
              message
            }
          }`,
      })
      .expect(({ body }) => {
        const data = body.data.sendFakeDevicePayload;
        expect(data.id).toBe('someID');
        expect(data.message).toBe('some message');
      })
      .expect(200);
  });

  it('fail on sendFakeDevicePayloadQuery w/o id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'sendFakeDevicePayload',
        query: `mutation sendFakeDevicePayload {
            sendFakeDevicePayload(input:{
              message:"some message"
            }), {
              id, 
              message
            }
          }`,
      })
      .expect(({ body }) => {
        const error = body.errors[0];

        expect(error.message).toBe(
          'Field "DeviceDTO.id" of required type "String!" was not provided.',
        );
        expect(error.extensions.code).toBe('GRAPHQL_VALIDATION_FAILED');
      })
      .expect(400);
  });

  it('fail on sendFakeDevicePayloadQuery w/o message', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'sendFakeDevicePayload',
        query: `mutation sendFakeDevicePayload {
            sendFakeDevicePayload(input:{
              id: "someID"
            }), {
              id, 
              message
            }
          }`,
      })
      .expect(({ body }) => {
        const error = body.errors[0];

        expect(error.message).toBe(
          'Field "DeviceDTO.message" of required type "String!" was not provided.',
        );
        expect(error.extensions.code).toBe('GRAPHQL_VALIDATION_FAILED');
      })
      .expect(400);
  });
});
