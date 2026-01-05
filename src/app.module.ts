import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionModule } from './position/position.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    PositionModule,
    TeamModule,
    PlayerModule,
    AuthModule,
    ChatModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
