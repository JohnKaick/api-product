import { ProductEntity } from 'src/modules/products/domain/entities/products.entity';
import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/create-products.usecase';
import { ProductRepository } from './infra/db/repositories/products.repository';
import { ProductController } from './infra/nestjs/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [CreateProductUseCase, ProductRepository],
})
export class ProductsModule {}
