import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import contractAbi from '../../../../constants/contractAbi/festivalTicketMarketPlace.json'
import { ethers } from 'ethers'
import { getMyTicketList } from '../../../../redux/authentication'
import LoadingButton from '../../../../common-components/LoadingButton'
import { getAllListedTicket } from '../store'

const NFTTicketUpdateOrBuy = ({ show, handleClose, data }) => {

  /* State vars */
  const [isBuyTicketLoading, setIsBuyTicketLoading] = React.useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = React.useState(false)
  const [isCancelLoading, setIsCancelLoading] = React.useState(false)

  /* Redux Vars */
  const contractData = useSelector(state => state.common.contractData)
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()

  /* Contract vars */
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractData.contractAddress, contractAbi, signer);


  let ticketPrice = data.listedPrice ? Number(data.listedPrice) : data.price ? Number(data.price) : 0

  const formik = useFormik({
    initialValues: {
      ticketPrice: ticketPrice,
    },
    validationSchema: Yup.object({
      ticketPrice: Yup.number()
        .min(0, 'Price cannot be negative')
        .notOneOf([0], 'Price cannot be zero')
        .test('is-valid-price', 'New price cannot be greater than 110% of old price', function (
          value
        ) {
          const oldPrice = Number(ticketPrice) || 0;
          const maxPrice = oldPrice * 1.1; // Calculate 110% of old price
          return value <= maxPrice;
        }).required('Required field'),
    }),
    onSubmit: (values) => {
      if (data.toUpdateTicket) {
        handleTicketUpdatePrice({ newPrice: values.ticketPrice, ...data })
      } else {
        handleBuyTicket({ newPrice: values.ticketPrice, ...data })
      }
    },
  })


  const handleBuyTicket = async (ticket) => {
    try {
      setIsBuyTicketLoading(true)

      const price = ethers.utils.parseEther(ticket.price)
      const buyTicketTx = await contract['buyTicketFromListing'](ticket.ticketId, {value: price});
      const buyTicketReceipt = await buyTicketTx.wait(1);
      localStorage.setItem('transactionhash', buyTicketReceipt.transactionHash)
      dispatch(getMyTicketList({ contractAddress: contractData.contractAddress, chainId: contractData.chainId, userAddress: userData.address }))
      setIsBuyTicketLoading(false)
      handleClose()

    } catch (error) {
      console.log(error)
      setIsBuyTicketLoading(false)
    }
  }

  const handleTicketCancelList = async () => {
    try {
      setIsCancelLoading(true)
      const cancelListTicketTx = await contract['cancelTicketListing'](data.ticketId);
      const cancelListTicketReceipt = await cancelListTicketTx.wait(1);
      localStorage.setItem('transactionhash', cancelListTicketReceipt.transactionHash)
      dispatch(getMyTicketList({ contractAddress: contractData.contractAddress, chainId: contractData.chainId, userAddress: userData.address }))
      setIsCancelLoading(false)
      handleClose()

    } catch (error) {
      console.log(error)
      setIsCancelLoading(false)
    }
  }


  const handleTicketUpdatePrice = async (ticket) => {
    try {
      setIsUpdateLoading(true)
      const price = ethers.utils.parseEther(ticket.newPrice.toString())
      const updatePriceTx = await contract['updateTicketPrice'](ticket.ticketId, price);
      const updatePriceReceipt = await updatePriceTx.wait(1);
      localStorage.setItem('transactionhash', updatePriceReceipt.transactionHash)
       dispatch(getAllListedTicket({ contractAddress: contractData.contractAddress, chainId: contractData.chainId }))
      setIsUpdateLoading(false)
      handleClose()

    } catch (error) {
      console.log(error)
      setIsUpdateLoading(false)
    }
  }



  const RemoveTicketButton = ({isLoading}) => {
    return (
      <>
      {!isLoading ? <button disabled={isUpdateLoading || isBuyTicketLoading} className={`w-full mt-5 bg-red-500 mx-1 hover:bg-red-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none ${(isUpdateLoading || isBuyTicketLoading) && 'cursor-not-allowed'}`} type='button' onClick={handleTicketCancelList}>
        Remove from listing
      </button> : <LoadingButton disabled btnText='Please wait...' className='w-full mt-5 bg-red-500 mx-1 hover:bg-red-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none' />}
      </>
    )
  }

  const UpdateTicketButton = ({isLoading}) => {
    return (
      <React.Fragment>
      {!isLoading ?<button disabled={isBuyTicketLoading || isCancelLoading} type='submit' className={`w-full mt-5 bg-blue-500 mx-1 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none ${(isBuyTicketLoading || isCancelLoading) && 'cursor-not-allowed'}`}>
        Update Price
      </button> : <LoadingButton disabled btnText='Please wait...' className='w-full mt-5 bg-blue-500 mx-1 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none' />}
      </React.Fragment>
    )
  }

  const BuyTicketButton = ({isLoading}) => {
    return (
      <React.Fragment>
      {!isLoading ? <button disabled={isCancelLoading || isUpdateLoading } type='submit' className={`w-full mt-5 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none ${(isCancelLoading || isUpdateLoading) && 'cursor-not-allowed'}`} >
        Buy Ticket
      </button> : <LoadingButton disabled btnText='Please wait...' className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" />}
      </React.Fragment>
    )
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-95"></div>
      <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl ">{data.toUpdateTicket ? 'Update Ticket' : 'Buy Ticket'}</h3>
          <i className=' text-2xl cursor-pointer' onClick={handleClose}>X</i>
        </div>
        <form className='font-bold' onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Id</label>
            <input disabled value={data.ticketId} name='ticketId' type="number" className="w-full px-2 py-3 bg-gray-100 border italic rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Address</label>
            <input disabled value={contractData.ticketAddress} name='ticketAddress' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Name</label>
            <input disabled value={contractData.ticketName} name='ticketName' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Symbol</label>
            <input disabled value={contractData.ticketSymbol} name='ticketSymbol' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          {data.isListed && <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Price</label>
            <input disabled value={data.ticketPrice} name='originalPrice' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">{data.toUpdateTicket ? 'Listed Price' : 'Price'}</label>
            <input disabled={!data.toUpdateTicket} value={formik.values.ticketPrice} name='ticketPrice' onChange={formik.handleChange} type="text" className="w-full px-2 py-3 font-extrabold text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter Price" />
            {formik.errors.ticketPrice && formik.touched.ticketPrice && <span className='text-red-500 font-bold text-sm'>{formik.errors.ticketPrice}</span>}
          </div>

          {(data.toUpdateTicket ? <div className='flex flex-col sm:flex-row xs:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-between '>
            <RemoveTicketButton isLoading={isCancelLoading}/>
            <UpdateTicketButton isLoading={isUpdateLoading}/>
          </div> : <BuyTicketButton isLoading={isBuyTicketLoading} />) }
        </form>
      </div>
    </div>
  )
}

export default NFTTicketUpdateOrBuy