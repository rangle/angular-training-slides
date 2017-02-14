import * as hedgehogs from './hedgehogs';
import {Promise} from 'es6-promise';

(function main () {

  // TS compile errors - uncomment to see compile failure
  // const hedgehog: hedgehogs.Hedgehog = new hedgehogs.Hedgehog(false, "five pounds");
  // const sonic: hedgehogs.Sonic = new hedgehogs.Sonic("blue", "10", "100");

  // TS successful compile
  const hedgehog: hedgehogs.Hedgehog = new hedgehogs.Hedgehog('brown', 5);
  const sonic: hedgehogs.Sonic = new hedgehogs.Sonic('blue', 10, 100);

  Promise.race([hedgehog.run(),sonic.run()])
    .then((value)=>console.log(value))
    .then(()=>console.log("race over!"));;

})();
