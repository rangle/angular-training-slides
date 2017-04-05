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

  it('should get 10 as the weight for hedge', () => {
    expect(hedge.weight).to.equal(10);
  })

  it('should get 100 rings for sonic', () => {
    expect(sonic.getNumberOfRings()).to.equal(100);
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
  });

  it('add a new sidekick info to sonic\'s personal info object', () => {
    expect(sonic.getPersonalInfo()).to.deep.equal({
      age: 26,
      faveConsole: 'Genesis'
    });
    expect(sonic.addNewPersonalInfo('sidekick', 'Tails')).to.be.undefined;
    expect(sonic.getPersonalInfo()).to.deep.equal({
      sidekick: 'Tails',
      age: 26,
      faveConsole: 'Genesis'
    });
  });

  it('update color, weight and number of rings for Sonic at once', () => {
    expect(sonic.getColor()).to.equal('red');
    expect(sonic.getWeight()).to.equal(10);
    expect(sonic.getNumberOfRings()).to.equal(100);

    // update color, weight, rings at once using an object 
    expect(sonic.setColorWeightRings({ 
      color: 'blue',
      weight: 15,
      numberOfRings: 110
    })).to.be.undefined;

    expect(sonic.getColor()).to.equal('blue');
    expect(sonic.getWeight()).to.equal(15);
    expect(sonic.getNumberOfRings()).to.equal(110);
  });
})