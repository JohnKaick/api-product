import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductDto } from '../../infra/nestjs/dtos/products.dto';
import { ProductRepository } from '../../infra/db/repositories/products.repository';
import { GetAllProductUseCase } from './get-all-products.usecase';

describe('GetAllProductUseCase', () => {
  let getAllProductUseCase: GetAllProductUseCase;
  let productRepository: ProductRepository;

  const mockProductDto1: ProductDto = {
    name: 'Product 1',
    daysExpiration: 5,
  };

  const mockProductDto2: ProductDto = {
    name: 'Product 2',
    daysExpiration: 10,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllProductUseCase =
      moduleRef.get<GetAllProductUseCase>(GetAllProductUseCase);
    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
  });

  it('should return all products', async () => {
    (productRepository.findAll as jest.Mock).mockResolvedValue([
      mockProductDto1,
      mockProductDto2,
    ]);

    const result = await getAllProductUseCase.execute();
    expect(result).toEqual([mockProductDto1, mockProductDto2]);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw InternalServerErrorException when repository throws error', async () => {
    const errorMessage = 'Database connection failed';

    (productRepository.findAll as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const loggerSpy = jest.spyOn(Logger.prototype, 'error');
    const expectedException = new InternalServerErrorException(
      'INTERNAL_SERVER_ERROR',
    );

    await expect(getAllProductUseCase.execute()).rejects.toThrow(
      expectedException,
    );
    expect(loggerSpy).toHaveBeenCalledWith(
      '[ERROR] PRODUCT (GET ALL) USE CASE: ',
      `${JSON.stringify(errorMessage)}`,
    );
  });
});
