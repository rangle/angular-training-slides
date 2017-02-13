import * as birds from './birds.js';

(function main(){
  let birdDetails = [[3,3], [6,6,'Emperor'], [5,5, 'King'], [2,2]];

  let birdList = birdDetails.map((args) => {
    if(args.length > 2){
      return new birds.Penguin(...args);
    } else {
      return new birds.Bird(...args);
    }
  })

  let [ bird, penguin, penguin2, bird2] = birdList;

  let race = Promise.race([bird.walk(),penguin.walk()]).then((value)=>console.log(value)).then(()=>console.log("race over! relay time!"));
  let wait = Promise.all([bird.walk(),penguin.walk()]).then((value)=>console.log(value));
})();