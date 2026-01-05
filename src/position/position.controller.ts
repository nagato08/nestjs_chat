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
import { PositionService } from './position.service';
import { updatePositionDto } from './dto/update-position.dto';
import { createPositionDto } from './dto/create-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all')
  getAllPositions() {
    return this.positionService.getAllPositions();
  }

  @Get('/one/:id')
  getOnePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.getOnePosition(id);
  }

  @Put('/update/:id')
  updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updatePositionDto,
  ) {
    return this.positionService.updatePosition(id, data);
  }

  @Delete('/delete/:id')
  deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.deletePosition(id);
  }

  @Post('/create')
  createPosition(@Body() data: createPositionDto) {
    return this.positionService.createPosition(data);
  }
}
