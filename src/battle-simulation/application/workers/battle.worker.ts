import { parentPort } from 'worker_threads';

if (parentPort) {
  parentPort.on('message', (data) => {
    const { pokemon1, pokemon2 } = data;
    const winner =
      pokemon1.attack - pokemon2.defense > pokemon2.attack - pokemon1.defense
        ? pokemon1
        : pokemon2;

    parentPort.postMessage({ winner });
    parentPort.close();
  });
}
