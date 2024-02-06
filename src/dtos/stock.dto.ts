import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  public symbol: string;

  @IsDecimal()
  @IsNotEmpty()
  public price: number;
}
