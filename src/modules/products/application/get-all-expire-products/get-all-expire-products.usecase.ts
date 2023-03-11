import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MessageHelper } from '../../../../common/helpers/message.helper';
import { ProductMapper } from '../../domain/mappers/products.mapper';
import { ProductRepository } from '../../infra/db/repositories/products.repository';
import { ProductDto } from '../../infra/nestjs/dtos/products.dto';

@Injectable()
export class GetAllExpireProductUseCase {
  private readonly logger: Logger;

  constructor(private readonly productsRepository: ProductRepository) {
    this.logger = new Logger(GetAllExpireProductUseCase.name);
  }

  async execute(): Promise<ProductDto[]> {
    try {
      const results = await this.productsRepository.findByExpire();
      return results.map((product) => ProductMapper.entityToDto(product));
    } catch (err) {
      this.logger.error(
        '[ERROR] PRODUCT (GET ALL EXPIRE) USE CASE: ',
        JSON.stringify(err.message),
      );
      throw new InternalServerErrorException(
        MessageHelper.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
