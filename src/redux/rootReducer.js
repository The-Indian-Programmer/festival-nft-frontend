// ** Reducers Imports
import Auth from './authentication'
import commonStore from './commonStore'
const rootReducer = {
  auth: Auth,
  common: commonStore,
}

export default rootReducer
