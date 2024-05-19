import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { SelectProductModule } from './modules/select-products/select-products.module';

@Module({
  imports: [DatabaseModule, ProductsModule, SelectProductModule],
})
export class AppModule {}
