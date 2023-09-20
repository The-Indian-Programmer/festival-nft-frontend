import React from 'react'

const TicketInfoModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
    <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-50"></div>
            <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-1/2 ">

                <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Token Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  NFT Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  disabled
                />
              </div>

                <button className="w-full mt-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" >Close</button>
            </div>
        </div>
  )
}

export default TicketInfoModal