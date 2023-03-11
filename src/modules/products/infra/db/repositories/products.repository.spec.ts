import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './../../../domain/entities/products.entity';
import { ProductRepository } from './products.repository';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let orm: Repository<ProductEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
            getMany: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    orm = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct: ProductEntity = {
        name: 'Product',
        daysExpiration: 30,
      };

      jest.spyOn(orm, 'save').mockResolvedValue(newProduct);

      const result = await repository.create(newProduct);

      expect(result).toEqual(newProduct);
      expect(orm.save).toHaveBeenCalledWith(newProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of product', async () => {
      const expiredProducts = [new ProductEntity(), new ProductEntity()];

      jest.spyOn(orm, 'find').mockResolvedValue(expiredProducts);

      const result = await repository.findAll();

      expect(result).toEqual(expiredProducts);
      expect(orm.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByExpired', () => {
    it('should return an array of expired products', async () => {
      const expiredProducts = [new ProductEntity(), new ProductEntity()];

      jest.spyOn(orm, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(expiredProducts),
      } as any);

      const result = await repository.findByExpired();

      expect(result).toEqual(expiredProducts);
    });
  });

  describe('findByExpire', () => {
    it('should return an array of expire products', async () => {
      const expireProducts = [new ProductEntity(), new ProductEntity()];

      jest.spyOn(orm, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(expireProducts),
      } as any);

      const result = await repository.findByExpire();

      expect(result).toEqual(expireProducts);
    });
  });
});
