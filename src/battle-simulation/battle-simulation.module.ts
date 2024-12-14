import { Module } from '@nestjs/common';

import { BattleSimulationController } from './infrastructure/controllers/battle-simulation.controller';
import { BattleSimulationService } from './application/services/battle-simulation.service';

@Module({
  controllers: [BattleSimulationController],
  providers: [BattleSimulationService],
})
export class BattleSimulationModule {}
