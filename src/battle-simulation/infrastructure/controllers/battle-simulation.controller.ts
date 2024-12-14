import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateBattleSimulationDto } from '../../domain/dto/create-battle-simulation.dto';
import { UpdateBattleSimulationDto } from '../../domain/dto/update-battle-simulation.dto';
import { BattleSimulationService } from 'src/battle-simulation/application/services/battle-simulation.service';

@Controller('battle-simulation')
export class BattleSimulationController {
  constructor(
    private readonly battleSimulationService: BattleSimulationService,
  ) {}
  // TODO Type later
  @Post()
  battleSimulation(@Body() createBattleSimulationDto: any) {
    return this.battleSimulationService.process(createBattleSimulationDto);
  }
}
