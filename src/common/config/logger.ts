import { format, transports } from 'winston';

export const loggerConfig = {
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL || 'info',
    }),
  ],
};
