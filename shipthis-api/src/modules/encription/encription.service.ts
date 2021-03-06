import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.keys';
import { AppLoggerService } from '../../log/applogger.service';
import {
  propertyIsValid,
  propertyTypeIsValid,
} from '../../config/verify-properties.functions';
const crypto = require('crypto');

@Injectable()
export class EncriptionService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _appLogger: AppLoggerService,
  ) {}

  encriptObject(content: any): void {
    const cryptoKey = this._configService.get(Configuration.ENCRIPTION_KEY1);
    const iv = this._configService.get(Configuration.ENCRIPTION_KEY2);
    this._appLogger.log(`Starting encription before inserting`);

    for (const key in content) {
      if (propertyTypeIsValid(content[key])) {
        if (propertyIsValid(key)) {
          const cipher = crypto.createCipheriv(
            'aes-256-cbc',
            Buffer.from(cryptoKey, 'hex'),
            Buffer.from(iv, 'hex'),
          );
          let encrypted = cipher.update(content[key]);
          encrypted = Buffer.concat([encrypted, cipher.final()]);
          content[key] = encrypted.toString('base64');
        }
      }
    }
  }

  decriptObject(content: any): void {
    const cryptoKey = this._configService.get(Configuration.ENCRIPTION_KEY1);
    const iv = this._configService.get(Configuration.ENCRIPTION_KEY2);
    this._appLogger.log(`Starting decription after load`);

    for (const key in content) {
      if (propertyTypeIsValid(content[key])) {
        if (propertyIsValid(key)) {
          const encryptedText = Buffer.from(content[key], 'base64');
          const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            Buffer.from(cryptoKey, 'hex'),
            Buffer.from(iv, 'hex'),
          );
          let decrypted = decipher.update(encryptedText, 'base64');
          decrypted = Buffer.concat([decrypted, decipher.final()]);
          content[key] = decrypted.toString();
        }
      }
    }
  }

  encriptString(content: string): string {
    const cryptoKey = this._configService.get(Configuration.ENCRIPTION_KEY1);
    const iv = this._configService.get(Configuration.ENCRIPTION_KEY2);
    this._appLogger.log(`Starting encription of string`);

    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(cryptoKey, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    let encrypted = cipher.update(content);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
  }
}
