import React from 'react'

import TicketFormModal from './popup/TicketFormModal'
import { isEmpty } from '../../../configs/Funtions'
const TIcket = ({ ticket, handleTicketView }) => {

    const [listTicketInfo, setListTicketInfo] = React.useState(null)




    const handleListTicket = (ticket) => {
        if (ticket.isListed) {
            // Cancel list ticket 
        } else {
            setListTicketInfo(ticket)
        }
    }


    return (
        <React.Fragment>
            <div className=" col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-3">
                <div className="bg-white rounded-lg p-5">
                    <div className="flex items-center justify-between">
                        <h5 className="text-xl font-bold">Ticket {ticket.ticketId}</h5>
                        <h5 className="text-xl font-bold">{ticket.ticketPrice} ETH</h5>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <button onClick={() => handleListTicket(ticket)} className="border-2 border-purple-600 text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                            {ticket.isListed ? 'Cancel List' : 'List Ticket'}
                        </button>
                        <button onClick={() => handleTicketView(ticket)} className="border-2 border-purple-600 text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                            View Ticket
                        </button>
                    </div>

                </div>
            </div>
            {!isEmpty(listTicketInfo) && <TicketFormModal show={!isEmpty(listTicketInfo)} handleClose={() => setListTicketInfo(null)} data={listTicketInfo}/>}
        </React.Fragment>
    )
}

export default TIcket