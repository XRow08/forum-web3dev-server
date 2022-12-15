import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Preencha a mensagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  message: string;

  @IsNotEmpty({ message: 'Preencha a imagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  image: string;
}
