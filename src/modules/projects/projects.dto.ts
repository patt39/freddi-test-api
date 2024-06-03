import { Status } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrUpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  status: Status;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  image: string;
}

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  search: string;
}
