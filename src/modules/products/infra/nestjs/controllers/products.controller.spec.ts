import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from './../../../application/create-products/create-products.usecase';
import { ProductDto } from '../dtos/products.dto';
import { ProductController } from './products.controller';

describe('ProductController', () => {
  let productController: ProductController;
  let createProductUseCase: CreateProductUseCase;

  const mockProductDto: ProductDto = {
    name: 'Product Name',
    daysExpiration: 30,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createdProduct = {
        id: 1,
        ...mockProductDto,
      };

      jest
        .spyOn(createProductUseCase, 'execute')
        .mockResolvedValue(createdProduct);

      const response = await productController.create(mockProductDto);

      expect(createProductUseCase.execute).toHaveBeenCalledWith(mockProductDto);
      expect(response).toEqual(createdProduct);
    });
  });
});
