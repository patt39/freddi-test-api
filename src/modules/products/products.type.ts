import { Product } from '@prisma/client';

export type GetOneProductSelections = {
  productId: Product['id'];
};

export type UpdateProductsSelections = {
  productId: Product['id'];
};

export type CreateProductsOptions = Partial<Product>;

export type UpdateProductsOptions = Partial<Product>;
