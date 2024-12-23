import { ConfigService } from '@nestjs/config';
import { BaseSendNotification } from './Base-send-notification.repository';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
// TODO remove this any type
@Injectable()
export class SendNotificationsRepository implements BaseSendNotification<any> {
  private transporter;
  constructor(
    private readonly configService: ConfigService<{
      USER_EMAIL: string;
      PASSWORD_EMAIL: string;
    }>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: this.configService.get('USER_EMAIL'),
        pass: this.configService.get('PASSWORD_EMAIL'),
      },
    });
  }
  async sendEmail(data: any): Promise<any> {
    const mailOptions = {
      from: '"Pokedex App" <noreply@pokedex.com>',
      to: data.email,
      subject: 'Tu código OTP para iniciar sesión',
      text: `Hola ✅  ${data.name}, tu OTP es ${data.otp}. Expira el ${data.otpExpiresAt}.`,
    };
    try {
      const result = await this.transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new Error('Error enviando email');
    }
  }
  async sendText(data: any): Promise<any> {
    console.log('data from notification repository send text method', data);
  }
  async sendWhatsapp(data: any): Promise<any> {
    console.log('data from notification repository send whatsapp method', data);
  }
}
