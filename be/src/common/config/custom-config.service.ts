import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get JWT_SECRET(): string {
    return String(this.configService.get('JWT_SECRET'));
  }

  public get DATABASE_NAME(): string {
    return String(this.configService.get('DATABASE_NAME'));
  }

  public get DATABASE_HOSTNAME(): string {
    return String(this.configService.get('DATABASE_HOSTNAME'));
  }

  public get DATABASE_PORT(): number {
    return Number(this.configService.get('DATABASE_PORT'));
  }

  public get DATABASE_USERNAME(): string {
    return String(this.configService.get('DATABASE_USERNAME'));
  }

  public get DATABASE_PASSWORD(): string {
    return String(this.configService.get('DATABASE_PASSWORD'));
  }

  public get PORT(): number {
    return Number(this.configService.get('PORT'));
  }
}
