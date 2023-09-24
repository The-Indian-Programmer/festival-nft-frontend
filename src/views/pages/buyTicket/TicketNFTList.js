import React from 'react'

// import TicketFormModal from './popup/TicketFormModal'
import { isEmpty } from '../../../configs/Funtions'
import { TICKET_IMAGE } from '../../../configs/Contants'
import NFTTicketUpdateOrBuy from './popup/BuyTicketModal'
const TicketNFTList = ({ ticket, handleTicketView }) => {

    const [listTicketInfo, setListTicketInfo] = React.useState(null)




    /* Function to handle ticket purchase or update */
    const handleTicketUpdateOrBuy = (ticket) => {
        console.log(ticket)
        if (ticket.isOwn) {
            // Update ticket
            setListTicketInfo({...ticket, toUpdateTicket: true})
        } else {
            // Buy ticket
            setListTicketInfo(ticket)
        }
    }
    
    

    return (
        <React.Fragment>
            <div className=" col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-3">
                <div className="bg-white rounded-lg p-5">
                    <div className="flex items-center justify-between">
                        <h5 className="text-xl font-bold">Ticket {ticket.ticketId}</h5>
                       
                    </div>
                    <img src={TICKET_IMAGE} className=" h-32 w-32 object-cover mt-3 mx-auto" alt="ticket" />
                    <div className='text-black font-semibold mt-2' >
                    <p className=''>Price: {ticket.price} ETH</p>
                  
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <button onClick={() => handleTicketUpdateOrBuy(ticket)} className={`border-2   font-extrabold  text-white px-3 py-2 rounded-md ${ticket.isOwn ? 'bg-blue-500' : 'bg-green-500'}`}>
                            {ticket.isOwn ? 'Update Ticket' : 'Buy Ticket'}
                        </button>
                        <button onClick={() => handleTicketView(ticket)} className="border-2  bg-purple-600 font-extrabold text-white px-3 py-2  rounded-md">
                            View Ticket
                        </button>
                    </div>

                </div>
            </div>
            {!isEmpty(listTicketInfo) && <NFTTicketUpdateOrBuy show={!isEmpty(listTicketInfo)} handleClose={() => setListTicketInfo(null)} data={listTicketInfo}/>}
        </React.Fragment>
    )
}

export default TicketNFTList