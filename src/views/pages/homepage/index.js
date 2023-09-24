import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isWalletConnected } from '../../../configs/Funtions'
import Swal from 'sweetalert2'
import TicketInfoModal from '../../../common-components/TicketInfoModal'
import TransactionProgress from '../../../common-components/TransactionProgress'
import { useHistory } from 'react-router-dom'
import { getMyTicketList } from '../../../redux/authentication';
import TIcket from './TIcket'
const HomePage = () => {



  // Redux vars
  const userData = useSelector(state => state.auth.userData)
  const userTickets = useSelector(state => state.auth.userTickets)
  const contractData = useSelector(state => state.common.contractData)
  const dispatch = useDispatch()

  // State vars
  const [ticketViewInfo, setTicketViewInfo] = React.useState({})

  /* Routes vars */
  const history = useHistory()

  // function to handle handleEthereumPayment
  const handleEthereumPayment = async () => {

  }

  // function to handle eth payment
  const handleTicketPurchase = () => {
    if (isWalletConnected(userData)) {
      history.push('/buy-ticket')
    } else {
      Swal.fire('Connect your wallet', '', 'question')
    }
  }


  useEffect(() => {
    if (isWalletConnected(userData) && !isEmpty(contractData)  && !isEmpty(contractData.contractAddress)) {
      dispatch(getMyTicketList({ contractAddress: contractData.contractAddress, chainId: contractData.chainId, userAddress: userData.address }))
    }
  }, [userData, contractData])


  /* Function to handle ticket view */
  const handleTicketView = (ticket) => {
    let data = {
      ...ticket,
      contractAddress: contractData.contractAddress,
      ticketAddress: contractData.ticketAddress,
      chainId: contractData.chainId,
      ticketName: contractData.ticketName,
      ticketSymbol: contractData.ticketSymbol
    }
    setTicketViewInfo(data)
    
  }

  return (
    <React.Fragment>

      <div className='homepage bg-gradient-to-r from-blue-500 to-purple-600'>
        <div className="  py-8 h-full">
          {/* /* myTicket  */}
          <div className='listed-ticket '>
            <div className="container mx-auto">
              <h2 className="text-white text-3xl font-bold mb-4">My Ticket</h2>
              <div className="grid grid-cols-12 gap-4">
                {
                  !isEmpty(userTickets) && userTickets.map((ticket, index) => {
                    return (
                      <TIcket key={index} ticket={ticket} handleTicketView={handleTicketView}/>
                    )
                  })
                }
              </div>
            </div>
          </div>


          <div className="flex flex-col mt-56 items-center h-96">
            <h2 className="text-white text-3xl font-bold mb-4">FESTIVAL NFT TICKET</h2>
            <p className="text-white text-lg mb-6">Buy Ticket Only <span className='font-extrabold'>{!isEmpty(contractData.price) ? contractData.price : '0.0'} Eth</span></p>
            <button onClick={handleTicketPurchase} className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300">Buy Now</button>
          </div>
        </div>
      </div>

      {!isEmpty(ticketViewInfo) && <TicketInfoModal data={ticketViewInfo} handleClose={() => setTicketViewInfo({})} />}
    </React.Fragment>
  )
}

export default HomePage
