import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from '@posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CommentsModule } from './comments/comments.module';
import { NotesModule } from './notes/notes.module';
import { FsrsModule } from './fsrs/fsrs.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    AuthModule,
    UsersModule,
    CommentsModule,
    NotesModule,
    FsrsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
