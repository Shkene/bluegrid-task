import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '..', 'logs', 'error.log');

const formatError = (error: any): string => {
  const timestamp = new Date().toISOString();
  const message = error.message || 'Unknown error';
  const stack = error.stack || '';
  return `${timestamp} - Error: ${message}\nStack: ${stack}\n\n`;
};

export const logger = (error: any): void => {
  const formattedError = formatError(error);

  console.error(formattedError);

  fs.appendFile(logFilePath, formattedError, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};
