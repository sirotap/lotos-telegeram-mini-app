import { Routes, Route } from "react-router-dom";
import NavbarTop from "@/components/NavbarTop";
import Home from "../components/Home";
import Search from "../components/Search";
import Orders from "../components/Orders";

const Dashboard = () => {
    return (
        <main className="h-[100svh] flex justify-between flex-col relative">
            <NavbarTop />
            <Routes>
                <Route path="search" element={<Search />} />
                <Route path="orders" element={<Orders />} />
                <Route path="" element={<Home />} />
            </Routes>
        </main>
    )
}

export default Dashboard;