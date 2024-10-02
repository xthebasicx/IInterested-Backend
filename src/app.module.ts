import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('DB_USER');
        const pass = configService.get<string>('DB_PASS');
        const dbName = configService.get<string>('DB_NAME');

        return {
          uri: `mongodb://${user}:${pass}@localhost:27017/${dbName}?authSource=admin`,
        };
      },
    }),
    CoreModule,
  ],
})
export class AppModule {}
