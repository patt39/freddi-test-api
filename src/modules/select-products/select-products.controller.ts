import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { reply } from '../../app/utils/reply';

import { ProductsService } from '../products/products.service';
import { SelectProductService } from './select-products.service';

@Controller('select-products')
export class SelectProductsController {
  constructor(
    private readonly selectProductsService: SelectProductService,
    private readonly productService: ProductsService,
  ) {}

  /** Get all selected products */
  @Get(`/`)
  async findAll(@Res() res) {
    const selectedProducts = await this.selectProductsService.findAll();

    return reply({ res, results: selectedProducts });
  }

  /** Select one product */
  @Post(`/:productId/create`)
  async createOne(
    @Res() res,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const productTax = 10 / 100;
    const importTax = 5 / 100;

    const findOneProduct = await this.productService.findOneBy({
      productId,
    });
    if (!findOneProduct)
      throw new HttpException(
        `ProductId: ${productId} doesn't exists please change`,
        HttpStatus.NOT_FOUND,
      );

    if (
      !['books', 'food', 'medical-products'].includes(findOneProduct.category)
    ) {
      if (findOneProduct.isApplyImportTax === true) {
        //Add categort tax
        const categoryTax = findOneProduct.price * productTax;
        //Add import tax
        const tax = findOneProduct.price * importTax;

        console.log(findOneProduct);

        const finalTax = categoryTax + tax;
        const finalAmount = findOneProduct.price + finalTax;

        await this.selectProductsService.createOne({
          tax: finalTax,
          price: finalAmount,
          importStatus: findOneProduct.isApplyImportTax,
          productId: findOneProduct.id,
        });
      } else {
        const tax = findOneProduct.price * productTax;
        const taxedAmount = findOneProduct.price + tax;

        await this.selectProductsService.createOne({
          tax: tax,
          price: taxedAmount,
          importStatus: findOneProduct.isApplyImportTax,
          productId: findOneProduct.id,
        });
      }
    }

    if (
      ['books', 'food', 'medical-products'].includes(findOneProduct.category)
    ) {
      if (findOneProduct.isApplyImportTax === true) {
        const tax = findOneProduct.price * importTax;
        const finalAmount = findOneProduct.price + tax;

        await this.selectProductsService.createOne({
          tax: tax,
          price: finalAmount,
          importStatus: findOneProduct.isApplyImportTax,
          productId: findOneProduct.id,
        });
      } else {
        await this.selectProductsService.createOne({
          tax: null,
          price: findOneProduct.price,
          importStatus: findOneProduct.isApplyImportTax,
          productId: findOneProduct.id,
        });
      }
    }

    return reply({ res, results: 'Product selected successfully' });
  }

  @Delete(`/:selectProductId/delete`)
  async deleteOne(
    @Res() res,
    @Param('selectProductId', ParseUUIDPipe) selectProductId: string,
  ) {
    const findOneSelectedProduct = await this.selectProductsService.findOneBy({
      selectProductId,
    });
    if (!findOneSelectedProduct)
      throw new HttpException(
        `SelectProductId: ${selectProductId} doesn't exists please change`,
        HttpStatus.NOT_FOUND,
      );

    await this.selectProductsService.updateOne(
      { selectProductId: findOneSelectedProduct.id },
      { deletedAt: new Date() },
    );

    return reply({ res, results: 'Product deleted successfully' });
  }
}
