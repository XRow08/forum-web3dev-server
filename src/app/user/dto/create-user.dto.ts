import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Preencha o username!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  username: string;

  @IsNotEmpty({ message: 'Preencha o email!' })
  @IsEmail({ message: 'Informe um email válido!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  email: string;

  @IsNotEmpty({ message: 'Preencha a senha!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  password: string;
}
