import {reducer as formReducer} from 'redux-form';
import * as redux from 'redux';

import  commitsReducer  from './report-reducer';

const rootReducer = redux.combineReducers({
 form:formReducer,
  commitsReducer,
})

export default rootReducer;