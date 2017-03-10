import { describe, it, before } from 'mocha';
import { Hedgehog, Sonic } from './exercise';
import { expect } from 'chai';

describe('TypeScript Classes', () => {
  let hedge: Hedgehog;
  let sonic: Sonic;

  before(() => {
    hedge = new Hedgehog('brown', 10);
    sonic = new Sonic('blue', 10, 100);
  });

  it('should get 100 rings for sonic', () => {
    expect(sonic.getNumberOfRings()).to.equal(100);
  });

  it('should get 10 as the weight for sonic', () => {
    expect(sonic.getWeight()).to.equal(10);
  });

  it('should get blue as the colour for sonic', () => {
    expect(sonic.getColor()).to.equal('blue');
  });

  it('should update sonic\'s colour to red', () => {
    expect(sonic.setColor('red')).to.be.undefined; // no return value
    expect(sonic.getColor()).to.equal('red');
  });

  it('should have sonic say its name', () => {
    expect(sonic.sayHi()).to.equal('Hi, my name is Sonic');
  });

  it('add a new item "invincibility" at the end of the owned items list', () => {
    expect(sonic.getItems()).to.deep.equal(['speed shoes', 'fire shield']);
    expect(sonic.addItem('invincibility')).to.be.undefined;
    expect(sonic.getItems()).to.deep.equal(['speed shoes', 'fire shield', 'invincibility']);
  })
})