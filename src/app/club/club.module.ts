import { PrismaService } from '../../database/prisma.service';
import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

@Module({
  controllers: [ClubController],
  providers: [ClubService, PrismaService],
})
export class ClubModule {}
