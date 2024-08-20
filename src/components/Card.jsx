/* eslint-disable react/no-unescaped-entities */
import ads from "../assets/ads.jpg";

const Card = () => {
    return (
        <div className="rounded-2xl max-w-[350px] mx-auto bg-slate-50 flex flex-col pb-3">
            <img src={ads} alt="palov" className="rounded-2xl w-full  h-auto max-h-[200px]" />
            <div className="px-2 mt-3">
                <h3 className="text-2xl font-semibold">23.000 so'm</h3>
                <h4 className="text-xl">Palov</h4>
                <p className="text-gray-400 mt-3">300g</p>
            </div>
            <button className=" mx-auto w-full py-3 bg-gray-200 rounded-xl max-w-[90%]">+ Qo'shish</button>
        </div>
    )
}

export default Card;