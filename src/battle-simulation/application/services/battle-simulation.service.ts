import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ApplicationService } from 'src/commons/domain/application-service';
import { Worker } from 'worker_threads';

@Injectable()
export class BattleSimulationService implements ApplicationService<any> {
  process(data?: any) {
    const { pokemon1, pokemon2 } = data;
    return new Promise((resolve, reject) => {
      const workerPath = path.resolve(__dirname, '../workers/battle.worker.js');
      const worker = new Worker(workerPath);
      worker.postMessage({ pokemon1, pokemon2 });

      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}
