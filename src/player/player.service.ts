import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  getAllPlayers() {
    return this.prisma.player.findMany();
  }

  getPlayerById(id: number) {
    return this.prisma.player.findUnique({ where: { id } });
  }

  getAllPlayersByTeam(teamId: number) {
    return this.prisma.player.findMany({ where: { teamId } });
  }

  getAllPlayersByPosition(positionId: number) {
    return this.prisma.player.findMany({ where: { positionId } });
  }

  async createPlayer(data: CreatePlayerDto) {
    return this.prisma.player.create({
      data,
    });
  }

  async updatePlayer(data: UpdatePlayerDto, id: number) {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException('Aucun joueur trouve ');
    }
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async deletePlayer(id: number) {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException('Aucun joueur trouve ');
    }

    return this.prisma.player.delete({
      where: { id },
    });
  }
}
