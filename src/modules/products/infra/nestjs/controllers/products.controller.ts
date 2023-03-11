import { Controller, HttpStatus, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductUseCase } from './../../../application/create-products/create-products.usecase';
import { ProductDto } from '../dtos/products.dto';
import { GetAllProductUseCase } from './../../../application/get-all-products/get-all-products.usecase';
import { GetAllExpiredProductUseCase } from './../../../application/get-all-expired-products/get-all-expired-products.usecase';
import { GetAllExpireProductUseCase } from './../../../application/get-all-expire-products/get-all-expire-products.usecase';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly getAllExpiredProductUseCase: GetAllExpiredProductUseCase,
    private readonly getAllExpireProductUseCase: GetAllExpireProductUseCase,
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

  @ApiOperation({
    summary: 'GetAllExpiredProducts',
    description: 'Get all products expired',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registration was successfully obtained.',
    type: [ProductDto],
  })
  @Get('/expired')
  async getAllExpired(): Promise<ProductDto[]> {
    return this.getAllExpiredProductUseCase.execute();
  }

  @ApiOperation({
    summary: 'GetAllExpireProducts',
    description: 'Get all products expire',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registration was successfully obtained.',
    type: [ProductDto],
  })
  @Get('/expire')
  async getAllExpire(): Promise<ProductDto[]> {
    return this.getAllExpireProductUseCase.execute();
  }
}
