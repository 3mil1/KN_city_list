import { format, transports } from 'winston';

/* eslint-disable */
export const loggerConfig = {
  format: format.combine(
    format.colorize(),
    format.metadata(),
    format.timestamp(),
    format.splat(),
    format.printf(({ timestamp, level, message, metadata }) => {
      const context = metadata.context ? `[${metadata.context}]` : '';
      return `[${timestamp}] ${context} ${level}: ${message}.`;
    }),
  ),
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL || 'info',
    }),
  ],
};
