import { ProductDto } from '../../infra/nestjs/dtos/products.dto';
import { ProductEntity } from '../entities/products.entity';

export class ProductMapper {
  static dtoToEntity(product: ProductDto): ProductEntity {
    const newProduct = new ProductEntity();
    newProduct.name = product.name;
    newProduct.daysExpiration = product.daysExpiration;

    return Object.assign(newProduct, ProductEntity);
  }

  static entityToDto(product: ProductEntity): ProductDto {
    return Object.assign(product, ProductDto);
  }
}
