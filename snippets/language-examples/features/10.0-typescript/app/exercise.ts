let str: string = 'Hello!';
let strings: string[] = ['hello', 'how are you', 'good bye'];
let num: number = 5;
let numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
let bool: boolean = false;
let booleans: boolean[] = [true, false, true];
let obj: { x: number } = { x: 10 };

enum IceCreams {
  Chocolate,
  Vanilla,
  Strawberry,
}

let flavour: IceCreams = IceCreams.Chocolate;
let flavours: IceCreams[] = [IceCreams.Vanilla, IceCreams.Strawberry];

class Test {
  value: string = 'initial value';
}

let test1: Test = new Test();
let tests: Test[] = [new Test(), new Test()]

let test2: Test = { value: 'huzzah!' };


function noop(): void {
}

let testNoop: () => void = noop;
let testNoops: (() => void)[] = [noop, noop, noop];

interface Noop {
  (): void;
}

let testNoops2: Noop[] = [noop, noop];

interface TestLike {
  value: string;
}

let test3: TestLike = { value: 'we are here' };
let test4: TestLike = test1;

