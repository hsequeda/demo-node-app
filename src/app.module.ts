import { Module } from '@nestjs/common';
import { FamilyModule } from './family/family.module';
import { AccessModule } from './access/access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FamilyModule,
    AccessModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
      entities: [
        join(__dirname, '**', 'adapter/*.entity.{ts,js}'),
        join(__dirname, '**', '*.entity.{ts,js}'),
      ],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
