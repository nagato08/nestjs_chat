/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeam } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllteams() {
    return this.prisma.team.findMany();
  }

  async getOneTeam(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });
    if (!team) {
      throw new Error('Aucune equipe trouve ');
    }
    return team;
  }

  async deleteTeam(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new Error('Aucune equipe trouve ');
    }

    return this.prisma.team.delete({
      where: { id },
    });
  }

  async createTeam(data : CreateTeam) {
    const teamExist = await this.prisma.team.findFirst({
      where: { name: data.name },
    });

    if (teamExist) {
      throw new BadRequestException('team already exists');
    }
    return await this.prisma.team.create({
      data,
    });
  }

  async updateTeam(id: number, data: UpdateTeamDto) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new Error('Aucune equipe trouve ');
    }
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }
}
