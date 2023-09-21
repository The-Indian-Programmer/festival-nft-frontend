import React, { Component, Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom"
import HomePageLayout from "../src/views/layout/homeLayout"
import { useWallet } from "./custom-hooks/useWallet";
import { useDispatch } from 'react-redux';
import { getContractData } from './redux/commonStore';
import { isEmpty } from './configs/Funtions';
import contractAddress from './constants/contractAddress/festivalTIcketMarketPlaceAddresses.json'
import ticketAddress from './constants/contractAddress/festivalTIcketAddresses.json'
const App = () => {

  const { isConnected, connection, chainId, address } = useWallet();

  /* Redux Vars */
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (isConnected && chainId && !isEmpty(address)) {
      let newContractAddress = !isEmpty(contractAddress[chainId]) ? contractAddress[chainId][contractAddress[chainId].length - 1]: '';
      let newTicketAddress = !isEmpty(ticketAddress[chainId]) ? ticketAddress[chainId][ticketAddress[chainId].length - 1]: '';
      if (isEmpty(newContractAddress) && isEmpty(ticketAddress)) return;

      dispatch(getContractData({ address: newContractAddress, chainId: chainId, ticketAddress: newTicketAddress }))
    }
  }, [isConnected, connection, chainId, address]);
  return (
    <Suspense fallback={'pageLoader'}>
      <Switch>
        <Route
          path="/"
          name="Layout"
          render={props => <HomePageLayout pageLoader={'pageLoader'} />}
        />

      </Switch>
    </Suspense>
  )
}

export default App
