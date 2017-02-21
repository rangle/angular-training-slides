export class Bird {
  constructor(height) {
    this.height = height;
  }

  walk() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve("Bird finished walking!"), this.height * 500);
    });
  }
}

export class Penguin extends Bird {
  constructor(height, type) {
    super(height);
    this.type = type;
  }

  walk() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve(`${this.type} penguin finished walking!`), this.height * 1000);
    });
  }

  swim() {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve(`${this.type} penguin finished swimming!`), this.height * 100);
    });
  }
}