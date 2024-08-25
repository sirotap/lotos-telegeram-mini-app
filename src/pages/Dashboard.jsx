import NavbarTop from "@/components/NavbarTop";
import Home from "../components/Home";

const Dashboard = () => {
    return (
        <main className="h-[100svh] flex justify-between flex-col relative">
            <NavbarTop />
            <Home />
        </main>
    )
}

export default Dashboard;