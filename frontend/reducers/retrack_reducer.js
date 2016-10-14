import { RECEIVE_RETRACKS, RECEIVE_SINGLE_RETRACK } from '../actions/track_actions'
import merge from 'lodash/merge';

const RetrackReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_RETRACKS:
      return action.retracks

    case RECEIVE_SINGLE_RETRACK:
      //const newState = merge({}, state);
      //const key = Object.keys(action.retrack)[0];
      //newState[key] = action.retrack[key];
      return merge({}, state, action.retrack.retrackIndicator);

    default:
      return state;
  }
}

export default RetrackReducer;
