import React from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
import { isEmpty, isWalletConnected } from '../../../configs/Funtions'
import Swal from 'sweetalert2'
import TicketInfoModal from '../../../common-components/TicketInfoModal'
import TransactionProgress from '../../../common-components/TransactionProgress'
import { useHistory } from 'react-router-dom'
const HomePage = () => {

  const PAYABLE_VALUE = ethers.utils.parseEther('0.1')


  // Redux vars
  const userData = useSelector(state => state.auth.userData)
  const contractData = useSelector(state => state.common.contractData)

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


  const myTicket = [
    {
      id: 1,
      name: 'Ticket 1',
      price: '0.1',
    },
    {
      id: 2,
      name: 'Ticket 2',
      price: '0.1',
    }
  ]


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
                  myTicket.map((ticket, index) => {
                    return (
                      <div key={index} className=" col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-3">
                        <div className="bg-white rounded-lg p-5">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xl font-bold">{ticket.name}</h5>
                            <h5 className="text-xl font-bold">{ticket.price} ETH</h5>
                          </div>
                          <div className="flex items-center justify-between mt-5">
                            <button className="border-2 border-purple-600 text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                              List Ticket
                            </button>
                            <button className="border-2 border-purple-600 text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                              View Ticket
                            </button>
                          </div>

                        </div>
                      </div>
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

      {/* <TicketInfoModal /> */}
      {/* <TransactionProgress isOpen={true} onClose={() => setShowPaymentModal(false)} txStatus='pending' /> */}
    </React.Fragment>
  )
}

export default HomePage
