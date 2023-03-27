import { Logger, Module } from '@nestjs/common';
import { CityModule } from '@app/modules/city/city.module';
import { UserModule } from '@app/modules/user/user.module';
import { AppService } from '@app/modules/app/app.service';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from '@app/common/config/logger';
import { CustomConfigModule } from '@app/common/config/custom-config.module';
import { AuthModule } from '@app/modules/auth/auth.module';

@Module({
  imports: [CustomConfigModule, WinstonModule.forRoot(loggerConfig), CityModule, UserModule, AuthModule],
  providers: [AppService, Logger],
})
export class AppModule {}
