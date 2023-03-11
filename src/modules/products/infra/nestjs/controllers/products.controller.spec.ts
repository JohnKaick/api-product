import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from './../../../application/create-products/create-products.usecase';
import { ProductDto } from '../dtos/products.dto';
import { ProductController } from './products.controller';
import { GetAllProductUseCase } from './../../../application/get-all-products/get-all-products.usecase';
import { GetAllExpiredProductUseCase } from './../../../application/get-all-expired-products/get-all-expired-products.usecase';
import { GetAllExpireProductUseCase } from './../../../application/get-all-expire-products/get-all-expire-products.usecase';

describe('ProductController', () => {
  let productController: ProductController;
  let createProductUseCase: CreateProductUseCase;
  let getAllProductUseCase: GetAllProductUseCase;
  let getAllExpiredProductUseCase: GetAllExpiredProductUseCase;
  let getAllExpireProductUseCase: GetAllExpireProductUseCase;

  const mockProductDto: ProductDto = {
    name: 'Product 1',
    daysExpiration: 30,
  };

  const mockProductDto2: ProductDto = {
    name: 'Product 2',
    daysExpiration: 10,
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
        {
          provide: GetAllProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllExpiredProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllExpireProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
    getAllProductUseCase =
      module.get<GetAllProductUseCase>(GetAllProductUseCase);
    getAllExpiredProductUseCase = module.get<GetAllExpiredProductUseCase>(
      GetAllExpiredProductUseCase,
    );
    getAllExpireProductUseCase = module.get<GetAllExpireProductUseCase>(
      GetAllExpireProductUseCase,
    );
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

      expect(response).toEqual(createdProduct);
      expect(createProductUseCase.execute).toHaveBeenCalledWith(mockProductDto);
    });
  });

  describe('getAll', () => {
    it('should get all products', async () => {
      const getAllProducts = [
        {
          id: 1,
          ...mockProductDto,
        },
        {
          id: 2,
          ...mockProductDto2,
        },
      ];

      jest
        .spyOn(getAllProductUseCase, 'execute')
        .mockResolvedValue(getAllProducts);

      const response = await productController.getAll();

      expect(response).toEqual(getAllProducts);
      expect(getAllProductUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllExpired', () => {
    it('should get all products expired', async () => {
      const getAllProducts = [
        {
          id: 1,
          ...mockProductDto,
        },
        {
          id: 2,
          ...mockProductDto2,
        },
      ];

      jest
        .spyOn(getAllExpiredProductUseCase, 'execute')
        .mockResolvedValue(getAllProducts);

      const response = await productController.getAllExpired();

      expect(response).toEqual(getAllProducts);
      expect(getAllExpiredProductUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllExpire', () => {
    it('should get all products expire', async () => {
      const getAllProducts = [
        {
          id: 1,
          ...mockProductDto,
        },
        {
          id: 2,
          ...mockProductDto2,
        },
      ];

      jest
        .spyOn(getAllExpireProductUseCase, 'execute')
        .mockResolvedValue(getAllProducts);

      const response = await productController.getAllExpire();

      expect(response).toEqual(getAllProducts);
      expect(getAllExpireProductUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
