import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, validateSync } from 'class-validator';

/* eslint-disable */
export class EnvironmentVariablesSchema {
  @Expose()
  @IsNotEmpty()
  public DATABASE_NAME = 'postgres';

  @Expose()
  @IsNotEmpty()
  public DATABASE_HOSTNAME = 'localhost';

  @Expose()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  public DATABASE_PORT = 5432;

  @Expose()
  @IsNotEmpty()
  public DATABASE_USERNAME = 'postgres';

  @Expose()
  @IsNotEmpty()
  public DATABASE_PASSWORD = 'postgres';

  @IsInt()
  @Expose()
  @Type(() => Number)
  public PORT = 3000;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(
    EnvironmentVariablesSchema,
    {
      ...new EnvironmentVariablesSchema(),
      ...config,
    },
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
