import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateClubDto {
  @IsNotEmpty({ message: 'Nenhum usuário para ser Criador!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  creator: string;

  @IsNotEmpty({ message: 'Preencha a mensagem!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  message: string;

  @IsNotEmpty({ message: 'Não há um Post!' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres!' })
  postId: string;
}
