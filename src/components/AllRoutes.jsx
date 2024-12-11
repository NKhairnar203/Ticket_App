import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import TicketCreate from "../pages/TicketCreate";
import TicketEdit from "../pages/TicketEdit";
import Tickets from "../pages/Tickets";
import TicketView from "../pages/TicketView";
import Login from "../pages/Login";
import Private from "./Private";
import Register from "../pages/Register";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/contact"
        element={
          <Private>
            <Contact />
          </Private>
        }
      />
      <Route
        path="/about"
        element={
          <Private>
            <About />
          </Private>
        }
      />
      <Route
        path="/ticket/create"
        element={
          <Private>
            <TicketCreate />
          </Private>
        }
      />
      <Route
        path="/ticket/edit/:id"
        element={
          <Private>
            <TicketEdit />
          </Private>
        }
      />
      <Route
        path="/tickets"
        element={
          <Private>
            <Tickets />
          </Private>
        }
      />
      <Route
        path="/ticket/view/:id"
        element={
          <Private>
            <TicketView />
          </Private>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
