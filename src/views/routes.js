import React from "react"
import HomePage from "../views/pages/homepage"
import BuyTicket from "./pages/buyTicket"


const Home = React.lazy(props => HomePage)

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