import {Promise} from 'es6-promise';

export class Hedgehog {
  color: string;
  weight: number;

  constructor (color: string, weight: number) {
    this.color = color;
    this.weight = weight;
  }

  run () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hedgehog has finished running'), 3000);
    });
  }
}

export class Sonic extends Hedgehog {
  rings: number;

  constructor (color: string, weight: number, numberOfRings: number) {
    super(color, weight);
    this.rings = numberOfRings;
  }

  run () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Sonic has finished running'), 500);
    });
  }

  getRings () {
    return `Sonic has ${this.rings} ${this.rings === 1 ? 'ring' : 'rings'}`
  }
}
