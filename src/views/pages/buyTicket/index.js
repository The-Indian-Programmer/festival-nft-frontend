import React, { useEffect } from 'react'
import PaymentModal from '../../../common-components/PaymentModal'
import { useDispatch, useSelector } from 'react-redux'
import {isWalletConnected} from '../../../configs/Funtions'
import { getAllListedTicket } from './store/index'
import {isEmpty} from '../../../configs/Funtions'
const BuyTicket = () => {

     // Redux vars
  const userData = useSelector(state => state.auth.userData)
  const allTickets = useSelector(state => state.nftTicket.tickets)
  const contractData = useSelector(state => state.common.contractData)
  const dispatch = useDispatch()

    const [showPaymentModal, setShowPaymentModal] = React.useState(false)


    // const listedTicket = [
    //     {
    //         id: 1,
    //         name: 'Ticket 1',
    //         price: '0.1',
    //         isOwn: false,
    //     },
    //     {
    //         id: 2,
    //         name: 'Ticket 2',
    //         price: '0.1',
    //         isOwn: true,
    //     },
    //     {
    //         id: 4,
    //         name: 'Ticket 3',
    //         price: '0.1',
    //         isOwn: true,
    //     },
    //     {
    //         id: 3,
    //         name: 'Ticket 4',
    //         price: '0.1',
    //         isOwn: false,
    //     }
    // ]

    const listedTicket = !isEmpty(allTickets) ? allTickets.map(item => {
        return {
            id: item.id,
            name: item.ticketId,
            price: item.price,
            sellerAddress: item.sellerAddress,
            isOwn: item.sellerAddress === userData.address ? true : false,
        }
    }) : []


    const handleBuyTicket = () => {
        setShowPaymentModal(true)
    }



    /* Function to get data on mount */
    useEffect(() => {
        if (isWalletConnected(userData) && !isEmpty(contractData)  && !isEmpty(contractData.contractAddress)) {
          dispatch(getAllListedTicket({ contractAddress: contractData.contractAddress, chainId: contractData.chainId }))
        }
      }, [userData, contractData])
 

    return (
        <React.Fragment>

            <div className="homepage bg-gradient-to-r from-blue-500 to-purple-600 w-full pt-20 w-100 h-full  mx-auto">
                <div className="  px-0 h-full">
                    <div className="flex items-center w-100 justify-end container mx-auto">
                        <button onClick={handleBuyTicket} className="border-4 border-white text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                            Buy Ticket
                            <i className="fas fa-plus ml-3"></i>
                        </button>
                    </div>
                    <div className='listed-ticket mt-5'>
                        <div className="container mx-auto">
                            <h2 className="text-white text-3xl font-bold mb-4">Listed Ticket</h2>
                            <div className="grid grid-cols-12 gap-4">
                                {
                                    listedTicket.map((ticket, index) => {
                                        return (
                                            <div key={index} className=" col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-3">
                                                <div className="bg-white rounded-lg p-5">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-xl font-bold">{ticket.name}</h5>
                                                        <h5 className="text-xl font-bold">{ticket.ticketPrice} ETH</h5>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-5">
                                                        <button className="border-2 border-purple-600 text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                                                            {ticket.isOwn ? 'Update Ticket' : 'Buy Ticket'}
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
                </div>
            </div>
            {showPaymentModal && <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />}
        </React.Fragment>
    )
}

export default BuyTicket