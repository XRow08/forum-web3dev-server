import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClubDto {
  @IsNotEmpty({ message: 'Preencha a mensagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  title: string;

  @IsNotEmpty({ message: 'Preencha a imagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  avatar: string;
}
