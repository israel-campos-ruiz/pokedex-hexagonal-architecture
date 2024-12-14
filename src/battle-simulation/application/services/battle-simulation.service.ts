import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ApplicationService } from 'src/commons/domain/application-service';
import { Worker } from 'worker_threads';

@Injectable()
export class BattleSimulationService implements ApplicationService<any> {
  process(data?: any) {
    const { pokemon1, pokemon2 } = data;
    return new Promise((resolve, reject) => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const workerPath = isDevelopment
        ? path.join(
            process.cwd(), // Usa el directorio raíz del proyecto
            'src',
            'battle-simulation',
            'application',
            'workers',
            'battle.worker.ts',
          )
        : path.join(__dirname, '../workers/battle.worker.js');
      const worker = new Worker(workerPath, {
        execArgv: isDevelopment ? ['-r', 'ts-node/register'] : [], // ts-node para TypeScript
      });
      worker.postMessage({ pokemon1, pokemon2 });

      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}
