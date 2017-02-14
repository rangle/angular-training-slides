import * as hedgehogs from './hedgehogs';
import {Promise} from 'es6-promise';

(function main () {

  // TS compile errors - uncomment to see compile failure
  // const hedgehog = new hedgehogs.Hedgehog(false, "five pounds");
  // const sonic = new hedgehogs.Sonic("100");

  // TS successful compile
  const hedgehog = new hedgehogs.Hedgehog('brown', 5);
  const sonic = new hedgehogs.Sonic(100);

  Promise.race([hedgehog.run(),sonic.run()])
    .then((value)=>console.log(value))
    .then(()=>console.log("race over!"));;

})();
