interface HedgehogInterface {
  color: string;
  weight: number;
  getColor(): string;
  getWeight(): number;
}

export class Hedgehog implements HedgehogInterface {
  color: string;
  weight: number;

  constructor (color: string, weight: number) {
    this.color = color;
    this.weight = weight;
  }

  getColor() : string {
    return this.color;
  }

  getWeight(): number {
    return this.weight;
  }
}

interface SonicInterface {
  color: string;
  weight: number;
  getColor(): string;
  getWeight(): number;
  getNumberOfRings(): number;
}

export class Sonic extends Hedgehog implements SonicInterface {
  numberOfRings: number;

  constructor (color: string, weight: number, numberOfRings: number) {
    super(color, weight);
    this.numberOfRings = numberOfRings;
  }

  getColor() : string {
    return this.color;
  }

  getWeight() : number {
    return this.weight;
  }

  getNumberOfRings() : number {
    return this.numberOfRings;
  }
}
