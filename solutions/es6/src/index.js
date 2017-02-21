import {Bird, Penguin} from './birds.js';

(() => {
  let birdDetails = [[3], [6,'Emperor'], [4,'King']];

  let birdList = birdDetails.map((args) => {
    if(args.length > 1){
      return new Penguin(...args);
    } else {
      return new Bird(...args);
    }
  })

  let [ bird, emperorPenguin, kingPenguin ] = birdList;

  console.log(`bird track meet starts ${(new Date()).toTimeString()}`);
  Promise.race([bird.walk(),emperorPenguin.walk()]).then( (value) => console.log(`${value}, race1 over! ${(new Date()).toTimeString()}`))
    .then(() => Promise.race([kingPenguin.walk(),emperorPenguin.walk()]).then((value)=>console.log(`${value}, race2 over! ${(new Date()).toTimeString()}`)))
    .then(() => Promise.race([kingPenguin.swim(),emperorPenguin.swim()]).then((value)=>console.log(`${value}, race3 over! ${(new Date()).toTimeString()}`)));
})();