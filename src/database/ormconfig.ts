import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auction } from 'src/auctions/entities/auctions.entity';

import { User } from '../users/entities/user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/messages/entities/room.entity';

export const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql' as 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'prod',
  // synchronize: true,
  logging: true,
  entities: [User, Auction, Message, Room],
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  timezone: 'KST',
  // migrationsRun: true,
  // seeds: ['src/database/seed s/**/*.ts'],
};
