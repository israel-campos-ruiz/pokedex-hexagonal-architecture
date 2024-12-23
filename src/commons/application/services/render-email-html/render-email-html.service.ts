import { Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class RenderEmailHtmlService implements ApplicationService<any> {
  process(name?: any, metadata?: any) {
    const filePath = join(
      process.cwd(),
      'src/commons/templates/email-templates',
      `${name}.html`,
    );
    let htmlTemplate = fs.readFileSync(filePath, 'utf8');
    for (const [key, value] of Object.entries(
      metadata as Record<string, any>,
    )) {
      const placeholder = `{{${key}}}`;
      htmlTemplate = htmlTemplate.replace(new RegExp(placeholder, 'g'), value);
    }

    return htmlTemplate;
  }
}
