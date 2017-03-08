import { describe, it, before } from 'mocha';
import { Hedgehog, Sonic } from './exercise';
import { expect } from 'chai';

describe('TypeScript Classes', () => {
  let sonic: Sonic;

  before(() => {
    sonic = new Sonic('blue', 10, 100);
  });

  it('should get 100 rings', () => {
    expect(sonic.getNumberOfRings()).to.equal(100);
  });

  it('should get 10 as the weight', () => {
    expect(sonic.getWeight()).to.equal(10);
  });

  it('should get blue as the colour', () => {
    expect(sonic.getColor()).to.equal('blue');
  })
})