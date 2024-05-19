import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { DatabaseService } from '../../app/database/database.service';
import {
  CreateProductsOptions,
  GetOneProductSelections,
  UpdateProductsOptions,
  UpdateProductsSelections,
} from './products.type';

@Injectable()
export class ProductsService {
  constructor(private readonly client: DatabaseService) {}

  async findAll() {
    const products = await this.client.product.findMany();

    return products;
  }

  async findOneBy(selections: GetOneProductSelections) {
    const prismaWhere = {} as Prisma.ProductWhereInput;

    const { productId } = selections;

    if (productId) {
      Object.assign(prismaWhere, { id: productId });
    }

    const product = await this.client.product.findFirst({
      where: { ...prismaWhere, deletedAt: null },
    });

    return product;
  }

  async createOne(options: CreateProductsOptions): Promise<Product> {
    const { name, price, image, category, currency, isApplyImportTax } =
      options;

    const product = this.client.product.create({
      data: {
        name,
        price,
        image,
        category,
        currency,
        isApplyImportTax,
      },
    });

    return product;
  }

  async updateOne(
    selections: UpdateProductsSelections,
    options: UpdateProductsOptions,
  ): Promise<Product> {
    const { productId } = selections;
    const { isApplyImportTax, deletedAt } = options;

    const product = this.client.product.update({
      where: { id: productId },
      data: { isApplyImportTax, deletedAt },
    });

    return product;
  }
}
