import { combineReducers } from 'redux';
import {
  ITrainState,
  trainReducer
} from './train';

export interface IAppState {
  train?: ITrainState;
}

export const rootReducer = combineReducers<IAppState>({
  train: trainReducer
});