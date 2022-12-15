import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.comment.findMany({
        select: {
          id: true,
          userId: true,
          postId: true,
          message: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createNew(data: CreateCommentDto, userId: string, postId: string) {
    try {
      await this.prismaService.comment.create({
        data: {
          ...data,
          user: { connect: { id: userId } },
          post: { connect: { id: postId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.comment.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateCommentDto) {
    await this.findOneById(id);
    return await this.prismaService.comment.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.comment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
