import { Controller, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductUseCase } from './../../../application/create-products/create-products.usecase';
import { ProductDto } from '../dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @ApiOperation({
    summary: 'CreateProduct',
    description: 'Product creation for the app',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: ProductDto,
  })
  @Post()
  async create(@Body() createProductDto: ProductDto): Promise<ProductDto> {
    return this.createProductUseCase.execute(createProductDto);
  }
}
