import { PartialType } from '@nestjs/swagger';
import { CreateBattleSimulationDto } from './create-battle-simulation.dto';

export class UpdateBattleSimulationDto extends PartialType(CreateBattleSimulationDto) {}
