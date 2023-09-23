// ** Reducers Imports
import Auth from './authentication'
import commonStore from './commonStore'
import nftTicket from '../views/pages/buyTicket/store'
const rootReducer = {
  auth: Auth,
  common: commonStore,
  nftTicket: nftTicket
}

export default rootReducer
