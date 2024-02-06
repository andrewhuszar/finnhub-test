import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  public symbol: string;
}
