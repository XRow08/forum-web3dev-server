import { PrismaService } from './../../database/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = this.hashPassword(data.password);
      const user = await this.prismaService.user.create({ data });
      delete user.password;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { username, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateUserDto) {
    await this.findOneById(id);
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    delete user.password;
    return user;
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  validatePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
