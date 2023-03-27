import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/modules/user/user.entity';
import { UserModule } from '@app/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/modules/auth/auth.controller';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@app/modules/auth/strategies/local.stratery';
import { CustomConfigModule } from '@app/common/config/custom-config.module';
import { CustomConfigService } from '@app/common/config/custom-config.service';
import { hashPassword, validatePassword } from '@app/common/utils/crypto-password';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      useFactory: (configService: CustomConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
      inject: [CustomConfigService],
    }),
    CustomConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserEntity,
    JwtStrategy,
    LocalStrategy,
    {
      provide: 'HASH_SERVICE',
      useValue: { hashPassword, validatePassword },
    },
  ],
})
export class AuthModule {}
