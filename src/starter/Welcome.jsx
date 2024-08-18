import illustration from "../assets/Illustration_1.png";
import logo from '../assets/g14.png'

const Welcome = () => {
    return (
        <div className="max-w-[400px] flex flex-col gap-y-4 px-5">
            <div className="flex items-center gap-x-2">
                <img src={logo} alt="img" className="w-14"/>
                <h1 className="text-4xl font-bold">Tamang <br /> FoodService</h1>
            </div>
            <div>
                <img src={illustration} alt="illustration" />
            </div>
            <div>
                <h3 className="text-2xl font-semibold">Welcome</h3>
                <p className="text-base">It’s a pleasure to meet you. We are excited that you’re here so let’s get started!</p>
            </div>
            <footer>
                <button>GET STARTER</button>
            </footer>
        </div>
    )
}

export default Welcome