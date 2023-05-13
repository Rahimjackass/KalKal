import 'tailwindcss/tailwind.css'

export default function SearchGame () {
    return (
        <div className='flex h-screen items-center justify-center bg-gradient-to-b from-violet-900'>
            <form className="w-1/3">
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="contractAddress">
                    Enter your game's contract address
                    </label>
                    <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contractAddress"
                    type="text"
                    placeholder="0xf4e98ed7ddb22a2c19e26395ab7da414654754cb"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    >
                    Search Game
                    </button>
                    <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="./createGame"
                    >
                    return to game creation?
                    </a>
                </div>
            </form>
        </div>
    )
} 