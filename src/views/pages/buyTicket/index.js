import React, { useEffect } from 'react'
import PaymentModal from '../../../common-components/PaymentModal'
import { useDispatch, useSelector } from 'react-redux'
import { isWalletConnected } from '../../../configs/Funtions'
import { getAllListedTicket } from './store/index'
import { isEmpty } from '../../../configs/Funtions'
import TicketNFTList from './TicketNFTList'
import TicketInfoModal from '../../../common-components/TicketInfoModal'
const BuyTicket = () => {

    // Redux vars
    const userData = useSelector(state => state.auth.userData)
    const allTickets = useSelector(state => state.nftTicket.tickets)
    const contractData = useSelector(state => state.common.contractData)
    const dispatch = useDispatch()

    const [showPaymentModal, setShowPaymentModal] = React.useState(false)

    const [ticketViewInfo, setTicketViewInfo] = React.useState({})

    const listedTicket = !isEmpty(allTickets) ? allTickets.map(item => {
        return {
            id: item.id,
            ticketId: item.ticketId,
            price: item.price,
            sellerAddress: item.sellerAddress,
            isOwn: item.sellerAddress === userData.address ? true : false,
            ticketOwner: item.sellerAddress,
        }
    }) : []


    const handleBuyTicket = () => {
        setShowPaymentModal(true)
    }



    /* Function to get data on mount */
    useEffect(() => {
        if (isWalletConnected(userData) && !isEmpty(contractData) && !isEmpty(contractData.contractAddress)) {
            dispatch(getAllListedTicket({ contractAddress: contractData.contractAddress, chainId: contractData.chainId }))
        }
    }, [userData, contractData])


    /* Function to handle ticket view */
    const handleTicketView = (ticket) => {
        let data = {
            ...ticket,
            isListed: true,
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
                                            <TicketNFTList key={index} ticket={ticket} handleTicketView={handleTicketView} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isEmpty(ticketViewInfo) && <TicketInfoModal data={ticketViewInfo} handleClose={() => setTicketViewInfo({})} />}
            {showPaymentModal && <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />}
        </React.Fragment>
    )
}

export default BuyTicket