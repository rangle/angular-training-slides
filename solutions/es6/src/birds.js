export class Bird {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }

  walk() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve("Bird finished walking!"), 2000);
    });
  }
}

export class Penguin extends Bird {
  constructor(weight, height, type) {
    super(weight, height);
    this.type = type;
  }

  walk() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve("Penguing finished walking!"), 5000);
    });
  }

  swim() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve("Penguing finished swimming!"), 2000);
    });
  }
}