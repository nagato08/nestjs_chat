import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/all')
  getAllPlayers() {
    return this.playerService.getAllPlayers();
  }

  @Get('/one/:id')
  getPlayerById(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.getPlayerById(id);
  }

  @Get('/team/:teamId')
  getAllPlayersByTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.playerService.getAllPlayersByTeam(teamId);
  }

  @Get('/position/:positionId')
  getAllPlayersByPosition(
    @Param('positionId', ParseIntPipe) positionId: number,
  ) {
    return this.playerService.getAllPlayersByPosition(positionId);
  }

  @Post('/create')
  createPlayer(@Body() data: CreatePlayerDto) {
    return this.playerService.createPlayer(data);
  }

  @Put('/update/:id')
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(data, id);
  }

  @Delete('/delete/:id')
  deletePlayer(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.deletePlayer(id);
  }
}
