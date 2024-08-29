import NavbarTop from "@/components/NavbarTop";
import Home from "../components/Home";

const Dashboard = () => {
    return (
        <main className="min-h-[100svh] h-full flex justify-between flex-col relative">
            <NavbarTop />
            <Home />
        </main>
    )
}

export default Dashboard;