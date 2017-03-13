interface HedgehogInterface {
  color: string;
  weight: number;
}

export class Hedgehog implements HedgehogInterface {
  private _color: string;
  private _weight: number;

  constructor (color: string, weight: number) {
    this._color = color;
    this._weight = weight - 5;
  }

  get color(): string {
    return this._color;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(newWeight: number) {
    this._weight = newWeight;
  }
}

interface SonicInterface {
  getColor(): string;
  getWeight(): number;
  getNumberOfRings(): number;
  setColor(newColor: string): void;
  setName(newName: string): void;
  sayHi(): string;
}

export class Sonic extends Hedgehog implements SonicInterface {
  private numberOfRings: number;
  private name: string;
  private itemsOwned: string[];
  private personalInfo: object;

  constructor (color: string, weight: number, numberOfRings: number) {
    super(color, weight);
    this.numberOfRings = numberOfRings;
    this.name = 'Sonic';
    this.itemsOwned = ['speed shoes', 'fire shield']; // items owned by default
    this.personalInfo = {
      age: 26,
      faveConsole: 'Genesis'
    };
  }

  getColor(): string {
    return this.color;
  }

  getWeight(): number {
    return this.weight;
  }

  getNumberOfRings(): number {
    return this.numberOfRings;
  }

  getItems(): string[] {
    return this.itemsOwned;
  }

  getPersonalInfo(): object {
    return this.personalInfo;
  }

  setColor(newColor: string): void {
    this.color = newColor;
  }

  setName(newName: string): void {
    this.name = newName;
  }

  addItem(newItem: string): void {
    [ newItem, ...this.itemsOwned ];
  }

  addNewPersonalInfo(key: string, value: any): void {
    this.personalInfo = { ...this.personalInfo, key: value };
  }

  setColorWeightRings({ weight, rings }): void {
    this.weight = weight;
    this.numberOfRings = rings;
  }

  sayHi(): string {
    return `Hi, my name is ${this.color}`;
  }
}
