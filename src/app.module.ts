import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { AuctionsModule } from './auctions/auctions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './database/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { CommonModule } from './common/common.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            return { token: connectionParams['x-jwt'] };
          },
        },
      },
      context: ({ req }) => {
        return { token: req.headers['x-jwt'] };
      },
    }),

    TypeOrmModule.forRoot(ormOptions),
    AuctionsModule,
    UsersModule,
    JwtModule,
    MessagesModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
