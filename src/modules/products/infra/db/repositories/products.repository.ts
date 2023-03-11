import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './../../../domain/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private orm: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    return this.orm.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.orm.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findByExpired(): Promise<ProductEntity[]> {
    const queryBuilder = this.orm.createQueryBuilder('products');

    queryBuilder.where('products.daysExpiration = :daysExpiration', {
      daysExpiration: 0,
    });

    return queryBuilder.getMany();
  }

  async findByExpire(): Promise<ProductEntity[]> {
    const queryBuilder = this.orm.createQueryBuilder('products');

    queryBuilder.where('products.daysExpiration != :daysExpiration', {
      daysExpiration: 0,
    });

    return queryBuilder.getMany();
  }
}
