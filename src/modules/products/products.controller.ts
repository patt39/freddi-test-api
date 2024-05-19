import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { reply } from '../../app/utils/reply';

import { getInstillaApi } from '../integration/instilla-api';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /** Get all products */
  @Get(`/`)
  async findAll(@Res() res) {
    const breeds = await this.productsService.findAll();

    return reply({ res, results: breeds });
  }

  /** Get instilla  apis */
  @Get(`/api`)
  async findApi(@Res() res) {
    const product = await getInstillaApi();

    return reply({ res, results: product });
  }

  /** Import products */
  @Post(`/import`)
  async createOne(@Res() res) {
    const productApi = await getInstillaApi();

    for (const product of productApi) {
      await this.productsService.createOne({
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: product.image,
      });
    }

    return reply({ res, results: 'Product saved successfully' });
  }

  /** Enable/disable import status currency */
  @Put(`/:productId/change-status`)
  async enableCurrency(
    @Res() res,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const findCurrency = await this.productsService.findOneBy({
      productId,
    });
    if (!findCurrency)
      throw new HttpException(
        `ProductId: ${productId} doesn't exists, please change`,
        HttpStatus.NOT_FOUND,
      );

    await this.productsService.updateOne(
      { productId: findCurrency.id },
      { isApplyImportTax: !findCurrency.isApplyImportTax },
    );

    return reply({ res, results: 'Import status changed successfully' });
  }
}
