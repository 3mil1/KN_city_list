import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormconfig from '@app/configs/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CityModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
