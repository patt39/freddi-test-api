import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrUpdateSelectProductsDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  productId: string;
}
