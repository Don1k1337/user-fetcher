import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  number?: string;
}
