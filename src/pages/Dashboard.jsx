import { Routes, Route } from "react-router-dom";
import NavbarTop from "@/components/NavbarTop";
import NavbarBottom from "@/components/NavbarBottom";
import Home from "../components/Home";
import Search from "../components/Search";
import Orders from "../components/Orders";
import Profile from "../components/Profile";

const Dashboard = () => {
    return (
        <main className="h-[100svh] flex justify-between flex-col">
            <NavbarTop />
            <Routes>
                <Route path="search" element={<Search />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path=" " element={<Home />} />
            </Routes>
            <NavbarBottom />
        </main>
    )
}

export default Dashboard;