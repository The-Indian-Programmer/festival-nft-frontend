import React from 'react'

const TicketInfoModal = ({handleClose, data}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
            <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-95"></div>
            <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-1/2 ">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl ">Festival Ticket</h3>
                    {data.isListed ?  <span className='px-2 py-1 mb-3 font-extrabold rounded-md  bg-green-600'>Listed</span> : <span className='px-2 py-1 mb-3 font-extrabold rounded-md  bg-red-600'>Not Listed</span>}

                </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Id</label>
                        <input disabled value={data.ticketId} name='ticketId' type="number" className="w-full px-2 py-3 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Address</label>
                        <input disabled value={data.ticketAddress} name='ticketAddress' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">NFT Address</label>
                        <input disabled value={data.contractAddress} name='nftAddress' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Name</label>
                        <input disabled value={data.ticketName} name='ticketName' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Symbol</label>
                        <input disabled value={data.ticketSymbol} name='ticketSymbol' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <button onClick={handleClose} type='button' className="w-full mt-5 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" >
                        Close
                    </button> 


            </div>
        </div>
  )
}

export default TicketInfoModal