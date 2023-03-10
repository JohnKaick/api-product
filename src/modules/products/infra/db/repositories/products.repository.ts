import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/products/domain/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    return this.repository.save(product);
  }

  async findByExpired(): Promise<ProductEntity[]> {
    const queryBuilder = this.repository.createQueryBuilder('products');

    queryBuilder.where('products.daysExpiration = :daysExpiration', {
      daysExpiration: 0,
    });

    return queryBuilder.getMany();
  }
}
