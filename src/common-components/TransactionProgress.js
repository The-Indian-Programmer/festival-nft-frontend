import React, { useEffect, useState } from 'react'

const TransactionProgress = ({ isOpen, onClose, txStatus }) => {

    const [width, setWidth] = useState(0);


    
  return (
    <div className="fixed inset-0 flex items-center justify-center">
    <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-90"></div>
            <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-1/2 ">
            <p className='text-gray-500 text-xl mb-9'>Your transition is in progress please wait for confirmation...</p>

                <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Transaction URL
                </label>
                <a href='https://github.com/The-Indian-Programmer/festival-nft-frontend' target='_blank' className="w-full focus:outline-none focus:ring focus:border-blue-300 text-blue-500">https://github.com/The-Indian-Programmer/festival-nft-frontend</a>
              </div>
              <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                  Transaction Hash
                </label>
                <span
                    className="w-full focus:outline-none text-gray-600"
                >
                    0x1234567890
                </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-yellow-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={
        {
            width: `${width}%`
        }
    }> {width}%</div>
  </div>
            </div>
        </div>
  )
}

export default TransactionProgress