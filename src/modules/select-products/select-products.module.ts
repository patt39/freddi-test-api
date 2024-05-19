import { Module } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { SelectProductsController } from './select-products.controller';
import { SelectProductService } from './select-products.service';

@Module({
  controllers: [SelectProductsController],
  providers: [SelectProductService, ProductsService],
})
export class SelectProductModule {}
