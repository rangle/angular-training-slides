interface HedgehogInterface {
  color: string;
  /*
   * EXERCISE: compilation fails because 'weight' is of wrong type
   * with `number` replaced with `string`
   */
  weight: number;
}

export class Hedgehog implements HedgehogInterface {
  private _color: string;
  private _weight: number;

  constructor (color: string, weight: number) {
    this._color = color;
    this._weight = weight;
  }

  get color(): string {
    return this._color;
  }

  get weight(): number {
    return this._weight;
  }

  /* 
   * EXERCISE: compilation fails because `color` is a read-only property
   * with `set color` removed.
   */
  set color(newColor: string) {
    this._color = newColor;
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

  constructor (color: string, weight: number, numberOfRings: number) {
    super(color, weight);
    this.numberOfRings = numberOfRings;
    this.name = 'Sonic';
    this.itemsOwned = ['speed shoes', 'fire shield']; // items owned by default
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

  setColor(newColor: string): void {
    this.color = newColor;
  }

  /*
   * EXERCISE: remove setName() definition so that compiler will fails
   * since Interface expects implementation of setName()
   */
  setName(newName: string): void {
    this.name = newName;
  }

  addItem(newItem: string): void {
    /*
     * EXERCISE: swap ...this.itemsOwned with newItem so that when 
     * addItem is called, newItem will be added to the front of the array
     * whereas unit test will test whether the newItem was added at the end
     */
    this.itemsOwned = [ ...this.itemsOwned, newItem ];
  }

  getItems(): string[] {
    return this.itemsOwned;
  }

  sayHi(): string {
    /*
     * EXERCISE: replace ${this.name} with something like ${this.color}
     * so that it doesn't print "Hi, my name is Sonic"
     */
    return `Hi, my name is ${this.name}`;
  }
}
