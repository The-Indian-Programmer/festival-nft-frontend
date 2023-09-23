import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import contractAbi from '../../../../constants/contractAbi/festivalTicketMarketPlace.json'
import { ethers } from 'ethers'
import { getMyTicketList } from '../../../../redux/authentication'
import LoadingButton from '../../../../common-components/LoadingButton'

const TicketFormModal = ({ show, handleClose, data }) => {

  /* State vars */
  const [isLoading, setIsLoading] = React.useState(false)

  /* Redux Vars */
  const contractData = useSelector(state => state.common.contractData)
  const userData = useSelector(state => state.auth.userData)

   /* Contract vars */
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(contractData.contractAddress, contractAbi, signer);

  const formik = useFormik({
    initialValues: {
      ticketPrice: data.ticketPrice ? Number(data.ticketPrice) : 0,
    },
    validationSchema: Yup.object({
      ticketPrice: Yup.number()
        .min(0, 'Price cannot be negative')
        .notOneOf([0], 'Price cannot be zero')
        .test('is-valid-price', 'New price cannot be greater than 110% of old price', function (
          value
        ) {
          const oldPrice = Number(data.ticketPrice) || 0;
          const maxPrice = oldPrice * 1.1; // Calculate 110% of old price
          return value <= maxPrice;
        }).required('Required field'),
    }),
    onSubmit: (values) => {
      handleListTicket({ newPrice: values.ticketPrice, ...data })
    },
  })


  const handleListTicket = async (ticket) => {
    try {
      setIsLoading(true)
      const price = ethers.utils.parseEther(ticket.newPrice.toString())
      const listTicketTx = await contract['listTicketForSale']( ticket.ticketId, price);
      const listTicketReceipt = await listTicketTx.wait(1);
      localStorage.setItem('transactionhash', listTicketReceipt.transactionHash)
      dispatch(getMyTicketList({ contractAddress: contractData.contractAddress, chainId: contractData.chainId, userAddress: userData.address }))
      setIsLoading(false) 
      handleClose()

  } catch (error) {
      console.log(error)
      setIsLoading(false)
  }  
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-95"></div>
      <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-1/2 ">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl ">List Ticket</h3>
          <i className=' text-2xl cursor-pointer' onClick={handleClose}>X</i>
        </div>
        <form className='font-bold' onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Id</label>
            <input disabled value={data.ticketId} name='ticketId' type="number" className="w-full px-2 py-3 bg-gray-100 border italic rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Name</label>
            <input disabled value={contractData.ticketName} name='ticketName' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ticket Symbol</label>
            <input disabled value={contractData.ticketSymbol} name='ticketSymbol' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">New Price</label>
            <input value={formik.values.ticketPrice} name='ticketPrice' onChange={formik.handleChange} type="text" className="w-full px-2 py-3 font-extrabold text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter Price" />
            {formik.errors.ticketPrice && formik.touched.ticketPrice && <span className='text-red-500 font-bold text-sm'>{formik.errors.ticketPrice}</span>}
          </div>

          {!isLoading ? <button type='submit' className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" >
            List Ticket
          </button> : <LoadingButton btnText='Please wait...' className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" />}
        </form>
      </div>
    </div>
  )
}

export default TicketFormModal