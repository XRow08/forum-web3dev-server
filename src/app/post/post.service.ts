import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.post.findMany({
        select: {
          id: true,
          creator: true,
          message: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createNew(data: CreatePostDto, creator: string, clubId: string) {
    try {
      await this.prismaService.post.create({
        data: {
          ...data,
          user: { connect: { id: creator } },
          club: { connect: { id: clubId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.post.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdatePostDto) {
    await this.findOneById(id);
    return await this.prismaService.post.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
