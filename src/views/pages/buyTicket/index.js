import React from 'react'

const BuyTicket = () => {


    const listedTicket = [
        {
            id: 1,
            name: 'Ticket 1',
            price: '0.1',
            isOwn: false,
        },
        {
            id: 2,
            name: 'Ticket 2',
            price: '0.1',
            isOwn: true,
        },
        {
            id: 4,
            name: 'Ticket 3',
            price: '0.1',
            isOwn: true,
        },
        {
            id: 3,
            name: 'Ticket 4',
            price: '0.1',
            isOwn: false,
        }
    ]

    return (
        <React.Fragment>

            <div className="homepage bg-gradient-to-r from-blue-500 to-purple-600 mt-20 w-full w-100 h-full  mx-auto">
                <div className="  px-0 h-full">
                    <div className="flex items-center w-100 justify-between mt-5 container mx-auto">
                        <h5 className="text-xl font-bold text-white">FESTIVAL TICKET NFT</h5>
                        <button className="border-4 border-white text-purple-600 font-extrabold bg-white px-3 py-1 rounded-sm">
                            Buy Ticket
                            <i className="fas fa-plus ml-3"></i>
                        </button>
                    </div>
                    <div className='listed-ticket mt-20'>
                        <div className="container mx-auto">
                            <div className="grid grid-cols-12 gap-4">
                                {
                                    listedTicket.map((ticket, index) => {
                                        return (
                                            <div key={index} className="col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                                                <div className="bg-white rounded-lg p-5">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-xl font-bold">{ticket.name}</h5>
                                                        <h5 className="text-xl font-bold">{ticket.price} ETH</h5>
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
        </React.Fragment>
    )
}

export default BuyTicket