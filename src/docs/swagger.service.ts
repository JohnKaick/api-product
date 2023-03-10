import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductsModule } from 'src/modules/products/products.module';

export class SwaggerService {
  static async generate(app, configService: ConfigService) {
    const document = SwaggerService.createDocument(app, configService);

    SwaggerModule.setup('docs', app, document);
  }

  static createDocument(app, configService: ConfigService) {
    const config = new DocumentBuilder()
      .setTitle(configService.get<string>('SWAGGER_TITLE'))
      .setDescription(configService.get<string>('SWAGGER_DESCRIPTION'))
      .setVersion(configService.get<string>('SWAGGER_VERSION'))
      .addTag('Products')
      .build();

    return SwaggerModule.createDocument(app, config, {
      include: [ProductsModule],
    });
  }
}
