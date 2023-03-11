import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductDto } from '../../infra/nestjs/dtos/products.dto';
import { ProductRepository } from '../../infra/db/repositories/products.repository';
import { CreateProductUseCase } from './create-products.usecase';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepository: ProductRepository;

  const mockProductDto: ProductDto = {
    name: 'Product Name',
    daysExpiration: 30,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a new product', async () => {
      (productRepository.create as jest.Mock).mockResolvedValue(mockProductDto);

      const result = await createProductUseCase.execute(mockProductDto);

      expect(productRepository.create).toHaveBeenCalledWith(mockProductDto);
      expect(result).toEqual(mockProductDto);
    });

    it('should throw an InternalServerErrorException if the product could not be created', async () => {
      const errorMessage = 'Error creating product';

      (productRepository.create as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const loggerSpy = jest.spyOn(Logger.prototype, 'error');
      const expectedException = new InternalServerErrorException(
        'INTERNAL_SERVER_ERROR',
      );

      await expect(
        createProductUseCase.execute(mockProductDto),
      ).rejects.toThrow(expectedException);
      expect(loggerSpy).toHaveBeenCalledWith(
        '[ERROR] PRODUCT (CREATE) USE CASE: ',
        `${JSON.stringify(errorMessage)}`,
      );
    });
  });
});
