import * as birds from './birds.js';

(function main(){
  let birdList = ['Emperor', 'King', 'Little', '', ]
  let bird = new birds.Bird(5,5);
  let penguin = new birds.Penguin(6,6,"Emperor");

  let race = Promise.race([bird.walk(),penguin.walk()]).then((value)=>console.log(value)).then(()=>console.log("race over! relay time!"));
  let wait = Promise.all([bird.walk(),penguin.walk()]).then((value)=>console.log(value));
})();