import {ITrainState} from './types';

const INITIAL_STATE: ITrainState = {
  passengers: [],
};

export function trainReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'ADD_PASSENGER':
      // we don't want to mutate the state
      return Object.assign(
        {},
        state,
        {
          // we don't want to mutate the array either
          passengers: state.passengers.concat([action.payload])
        }
      );
    case 'REMOVE_PASSENGER':
      const newPassengers = [].concat(state.passengers);
      newPassengers.splice(action.payload, 1);
      return Object.assign(
        {},
        state,
        {
          passengers: newPassengers
        }
      );
    default:
      return state;
  }
}
