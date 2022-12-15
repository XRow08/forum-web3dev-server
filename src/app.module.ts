import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { PostModule } from './app/post/post.module';
import { CommentModule } from './app/comment/comment.module';
import { ClubModule } from './app/club/club.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    CommentModule,
    ConfigModule.forRoot(),
    UserModule,
    PostModule,
    ClubModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
