import { Controller, HttpStatus, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductUseCase } from './../../../application/create-products/create-products.usecase';
import { ProductDto } from '../dtos/products.dto';
import { GetAllProductUseCase } from './../../../application/get-all-products/get-all-products.usecase';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
  ) {}

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

  @ApiOperation({
    summary: 'GetAllProducts',
    description: 'Get all products',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registration was successfully obtained.',
    type: [ProductDto],
  })
  @Get()
  async getAll(): Promise<ProductDto[]> {
    return this.getAllProductUseCase.execute();
  }
}
