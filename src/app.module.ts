import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeviceModule } from './devices/devices.modules';
import {
  GraphQLError,
  GraphQLFormattedError,
} from 'graphql/error/GraphQLError';

@Module({
  imports: [
    DeviceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      debug: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
