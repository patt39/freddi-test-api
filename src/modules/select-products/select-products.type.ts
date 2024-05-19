import { SelectProduct } from '@prisma/client';

export type GetBreedsSelections = {
  search?: string;
  organizationId?: string;
};

export type GetOneSelectProductsSelections = {
  selectProductId?: SelectProduct['id'];
};

export type UpdateSelectProductsSelections = {
  selectProductId: SelectProduct['id'];
};

export type CreateSelectProductsOptions = Partial<SelectProduct>;

export type UpdateSelectProductsOptions = Partial<SelectProduct>;

export const SelectedProductsSelect = {
  createdAt: true,
  id: true,
  tax: true,
  price: true,
  importStatus: true,
  productId: true,
  product: {
    select: {
      name: true,
      currency: true,
    },
  },
};
