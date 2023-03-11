import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductEntity } from 'src/modules/products/domain/entities/products.entity';
import { CreateProductUseCase } from './application/create-products/create-products.usecase';
import { ProductRepository } from './infra/db/repositories/products.repository';
import { ProductController } from './infra/nestjs/controllers/products.controller';
import { GetAllProductUseCase } from './application/get-all-products/get-all-products.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [CreateProductUseCase, GetAllProductUseCase, ProductRepository],
})
export class ProductsModule {}
