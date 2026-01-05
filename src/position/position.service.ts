import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { updatePositionDto } from './dto/update-position.dto';
import { createPositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPositions() {
    return this.prisma.position.findMany();
  }

  async getOnePosition(id: number) {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!position) {
      throw new Error('Aucun poste trouve ');
    }
    return position;
  }

  async createPosition(data: createPositionDto) {
    const positionExist = await this.prisma.position.findFirst({
      where: { name: data.name },
    });

    if (positionExist) {
      throw new BadRequestException('Position already exists');
    }

    return await this.prisma.position.create({
      data,
    });
  }

  async updatePosition(id: number, data: updatePositionDto) {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!position) {
      throw new NotFoundException('Aucun poste trouve ');
    }
    return this.prisma.position.update({
      where: { id },
      data,
    });
  }

  async deletePosition(id: number) {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!position) {
      throw new NotFoundException('Aucun poste trouve ');
    }
    return this.prisma.position.delete({
      where: { id },
    });
  }
}
