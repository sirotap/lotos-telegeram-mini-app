import illustration from "../assets/Illustration_1.png";
import logo from '../assets/g14.png'

const Welcome = () => {
    return (
        <div className=" flex flex-col items-center text-center pt-10 justify-around h-[100dvh]">
            <div className="flex items-center gap-x-2">
                <img src={logo} alt="img" className="w-14"/>
                <h1 className="text-4xl font-bold">Tamang <br /> FoodService</h1>
            </div>
            <div className="">
                <img src={illustration} alt="illustration" />
            </div>
            <div>
                <h3 className="text-2xl font-semibold">Welcome</h3>
                <p className="text-base px-5">It’s a pleasure to meet you. We are excited that you’re here so let’s get started!</p>
            </div>
            <footer className="w-full">
                <button className="bg-primary-50 text-white text-base w-full py-2 rounded-md">GET STARTER</button>
            </footer>
        </div>
    )
}

export default Welcome