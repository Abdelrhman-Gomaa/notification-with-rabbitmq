import { Injectable } from '@nestjs/common';
import { MailDetails } from './mail.type';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  private from: any;
  private transporter: any;

  constructor(private readonly configService: ConfigService) {
    const fromEnv =
      'abdelrhman.gomaa@baianat.com:ooykgwpyqcmhfxpp' || this.configService.get<string>('MAIL_ACCOUNT');
    const fromDetails = (fromEnv || 'email:password').split(':');

    this.from = {
      mail: fromDetails[0],
      password: fromDetails[1]
    };

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secureConnection: false,
      secure: false,
      port: 587,
      auth: {
        user: this.from.mail,
        pass: this.from.password
      }
    });
  }

  public async send(input: MailDetails) {
    const { to, html, from, subject } = input;
    const transporter = this.transporter;
    try {
      await transporter.sendMail({
        from: from || this.from.mail,
        to,
        subject,
        html
      });
    } catch (e) {
      console.log(e);
    }
  }
}
