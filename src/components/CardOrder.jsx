/* eslint-disable react/prop-types */
// KartaBuyurtma komponenti
const KartaBuyurtma = ({ mahsulot, miqdor, buyurtmaniYangilash }) => {
    return (
        <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
            <div>
                <h3 className="text-lg font-semibold">{mahsulot && mahsulot.nomi}</h3>
                <p>{mahsulot && mahsulot.narxi.toLocaleString()} сум</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => buyurtmaniYangilash(mahsulot.id, Math.max(0, miqdor - 1))}
                    className="px-2 py-1 bg-gray-200 rounded-l"
                >
                    -
                </button>
                <span className="px-4 py-1 bg-gray-100">{miqdor}</span>
                <button
                    onClick={() => buyurtmaniYangilash(mahsulot.id, miqdor + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default KartaBuyurtma;