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
import { TeamService } from './team.service';
import { CreateTeam } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/all')
  getAllTeams() {
    return this.teamService.getAllteams();
  }

  @Get('/one/:id')
  getOneTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.getOneTeam(id);
  }

  @Put('/update/:id')
  updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(id, data);
  }

  @Delete('/delete/:id')
  deleteTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.deleteTeam(id);
  }

  @Post('/create')
  createTeam(@Body() data: CreateTeam) {
    return this.teamService.createTeam(data);
  }
}
