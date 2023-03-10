import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MessageHelper } from 'src/common/helpers/message.helper';
import { ProductMapper } from '../domain/mappers/products.mapper';
import { ProductRepository } from '../infra/db/repositories/products.repository';
import { ProductDto } from '../infra/nestjs/dtos/products.dto';

@Injectable()
export class CreateProductUseCase {
  private readonly logger: Logger;

  constructor(private readonly productsRepository: ProductRepository) {
    this.logger = new Logger(CreateProductUseCase.name);
  }

  async execute(productsDto: ProductDto): Promise<ProductDto> {
    try {
      const result = await this.productsRepository.create(
        ProductMapper.dtoToEntity(productsDto),
      );
      return ProductMapper.entityToDto(result);
    } catch (err) {
      this.logger.error(
        '[ERROR] PRODUCT (CREATE) USE CASE: ',
        JSON.stringify(err.message),
      );
      throw new InternalServerErrorException(
        MessageHelper.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
