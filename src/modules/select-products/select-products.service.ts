import { Injectable } from '@nestjs/common';
import { Prisma, SelectProduct } from '@prisma/client';
import { DatabaseService } from '../../app/database/database.service';
import {
  CreateSelectProductsOptions,
  GetOneSelectProductsSelections,
  SelectedProductsSelect,
  UpdateSelectProductsOptions,
  UpdateSelectProductsSelections,
} from './select-products.type';

@Injectable()
export class SelectProductService {
  constructor(private readonly client: DatabaseService) {}

  async findAll() {
    const prismaWhere = {} as Prisma.SelectProductWhereInput;

    const selectProducts = await this.client.selectProduct.findMany({
      where: { ...prismaWhere, deletedAt: null },
      select: SelectedProductsSelect,
    });

    return selectProducts;
  }

  async findOneBy(selections: GetOneSelectProductsSelections) {
    const prismaWhere = {} as Prisma.SelectProductWhereInput;

    const { selectProductId } = selections;

    if (selectProductId) {
      Object.assign(prismaWhere, { id: selectProductId });
    }

    const selectProduct = await this.client.selectProduct.findFirst({
      where: { ...prismaWhere, deletedAt: null },
    });

    return selectProduct;
  }

  async createOne(
    options: CreateSelectProductsOptions,
  ): Promise<SelectProduct> {
    const { tax, price, importStatus, productId } = options;

    const selectedProduct = this.client.selectProduct.create({
      data: {
        tax,
        price,
        importStatus,
        productId,
      },
    });

    return selectedProduct;
  }

  async updateOne(
    selections: UpdateSelectProductsSelections,
    options: UpdateSelectProductsOptions,
  ): Promise<SelectProduct> {
    const { selectProductId } = selections;
    const { tax, deletedAt } = options;

    const selectProduct = this.client.selectProduct.update({
      where: { id: selectProductId },
      data: { tax, deletedAt },
    });

    return selectProduct;
  }
}
