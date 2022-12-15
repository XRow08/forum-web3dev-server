import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Preencha o username!' })
  @MaxLength(255)
  username: string;

  @IsNotEmpty({ message: 'Preencha o email!' })
  @IsEmail({ message: 'Informe um email válido!' })
  @MaxLength(255)
  email: string;
}
