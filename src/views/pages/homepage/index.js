import React from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
import { isWalletConnected } from '../../../configs/Funtions'
import Swal from 'sweetalert2'
import PaymentModal from './popup/PaymentModal'
import { useHistory } from 'react-router-dom'
const HomePage = () => {

  const PAYABLE_VALUE = ethers.utils.parseEther('0.1')


  // Redux vars
  const userData = useSelector(state => state.auth.userData)

  // State vars
  const [showPaymentModal, setShowPaymentModal] = React.useState(false)

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




  return (
    <React.Fragment>

      <div className='homepage'>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-96 px-8 h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-3xl font-bold mb-4">FESTIVAL NFT TICKET</h2>
            <p className="text-white text-lg mb-6">Buy Ticket Only <span className='font-extrabold'>1 Eth</span></p>
            <button onClick={handleTicketPurchase} className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300">Buy Now</button>
          </div>
        </div>
      </div>

      {/* <PaymentModal /> */}
    </React.Fragment>
  )
}

export default HomePage
