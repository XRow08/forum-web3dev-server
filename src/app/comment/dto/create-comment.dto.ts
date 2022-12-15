import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Preencha a mensagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  message: string;
}
