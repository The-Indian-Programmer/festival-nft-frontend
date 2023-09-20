import React from "react"
import Allfunders from "../views/pages/allfunders/index"
import HomePage from "../views/pages/homepage"
import BuyTicket from "./pages/buyTicket"


const Home = React.lazy(props => HomePage)
const AllfundersList = React.lazy(props => Allfunders)

export const publicRoute = [
  {
    path: "/",
    display: true,
    exact: true,
    name: "Home",
    component: HomePage,
    className: ""
  },
  {
    path: "/buy-ticket",
    display: true,
    exact: true,
    name: "Buy Ticket",
    component: BuyTicket,
    className: ""
  }
]