import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../configs/Funtions'
import { ethers } from 'ethers'
import { WEB3_PROVIDER_URL } from '../configs/Contants'
import contractAbi from '../constants/contractAbi/festivalTicketMarketPlace.json'
import LoadingButton from './LoadingButton'
import { getContractData } from '../redux/commonStore'
const PaymentModal = ({ show, handleClose }) => {

    /* State vars */
    const [isLoading, setIsLoading] = React.useState(false)


    /* Redux vars */
    const contractData = useSelector(state => state.common.contractData)
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()



    /* Contract vars */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractData.contractAddress, contractAbi, signer);

    let maxTicketId = 1000
    let soldTickets = 1
    if (!isEmpty(contractData.maxTickets)) {
        maxTicketId = contractData.maxTickets
    }

    if (contractData.soldTickets) {
        soldTickets = contractData.soldTickets + 1
    }


    const formik = useFormik({
        initialValues: {
            ticketId: soldTickets,
            ticketAddress: contractData.ticketAddress,
            nftAddress: contractData.contractAddress
        },
        validationSchema: Yup.object({
            ticketId: Yup.number().min(1, 'Ticket Id must be greater than 0').max(maxTicketId, `Ticket Id must be less than ${maxTicketId}`).required('Required'),
            ticketAddress: Yup.string().required('Required'),
            nftAddress: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            handleTicketPurchase(values)
        }
    })

    const handleTicketPurchase = async (values) => {
        // const 
        try {
            setIsLoading(true)
            const price = ethers.utils.parseEther(contractData.price)
            const buyTicketTx = await contract['buyTicket']({
                value: price,
            });
            const buyTicketReceipt = await buyTicketTx.wait(1);
            console.log(buyTicketReceipt)
            localStorage.setItem('transactionhash', buyTicketReceipt.transactionHash)
            dispatch(getContractData({ address: contractData.contractAddress, chainId: contractData.chainId, ticketAddress: contractData.ticketAddress }))
            setIsLoading(false) 
            handleClose()

        } catch (error) {
            console.log(error)
        }
        
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center">
            <div className="modal-overlay fixed inset-0 bg-gray-700 opacity-95"></div>
            <div className="modal-container bg-white p-8 mx-auto rounded z-50 shadow-lg w-11/12 sm:w-1/2 ">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-xl ">Buy Ticket</h3>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleClose}>Close</button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Id</label>
                        <input disabled value={formik.values.ticketId} onChange={formik.handleChange} name='ticketId' type="number" className="w-full px-2 py-3 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                        {formik.errors.ticketId && formik.touched.ticketId && <p className="text-red-500 text-xs italic">{formik.errors.ticketId}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ticket Address</label>
                        <input disabled value={contractData.ticketAddress} name='ticketAddress' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">NFT Address</label>
                        <input disabled value={contractData.contractAddress} name='nftAddress' type="text" className="w-full px-2 py-3 italic text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter TicketID" />
                    </div>
                    {!isLoading ? <button type='submit' className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" >
                        Buy Ticket
                    </button> : <LoadingButton btnText='Please wait...' className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg focus:outline-none" />}

                </form>

            </div>
        </div>
    )
}

export default PaymentModal


