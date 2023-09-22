import { ethers } from "ethers";
import { isEmpty } from "../configs/Funtions";
import contractAddress from '../constants/contractAddress/festivalTIcketMarketPlaceAddresses.json'
import contractAbi from "../constants/contractAbi/festivalTicketMarketPlace.json"
import axios from "axios";
import { API_URL} from "../configs/Contants"
import Swal from "sweetalert2";

axios.defaults.baseURL = API_URL;

const chainId = 1337;
let newContractAddress = !isEmpty(contractAddress[chainId]) ? contractAddress[chainId][contractAddress[chainId].length - 1]: '';

const ContractEvents = () => {
    const provider = new ethers.providers.WebSocketProvider("ws://localhost:7545");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(newContractAddress, contractAbi, signer);
    
    
    
    contract.on("TicketBought", async (seller, ticketId, price) => {
        const ethPrice = ethers.utils.formatEther((price));
        let payload = {
            ticketId: parseInt(ticketId),
            seller: seller,
            price: ethPrice,
            chainId: chainId,
            contractAddress: newContractAddress
        }
        const response = await axios.post('/api/ticket/buy', payload);
        if (response.data.status) {
            Swal.fire({
                text: 'Ticket bought successfully',
                icon: 'success',
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Ticket bought but not saved in database',
            })            
        }
    });
};

export default ContractEvents;