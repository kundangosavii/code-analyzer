import { Bell } from "lucide-react"


export default function Navbar({repo}) {
    return (
        <>
            <div className="w-full bg-[#080817] border-b border-gray-800 px-6 py-3 flex items-center justify-between">

                <div className="flex item-center gap-6 items-center">
                    <div>
                        <h1 className="text-blue-400 font-semibold text-lg">
                            CodeSync AI
                        </h1>
                        <p className="text-xs text-gray-500">Enterprise Tier</p>
                    </div>
                    <div className="ml-12">
                        <h1 className="text-white font-semibold text-lg">
                            {repo ? repo.name : "No repository selected"}
                        </h1>
                        <div className="flex items-center gap-1">
                            <p className="bg-green-500 h-2 w-2 border rounded-full"></p>
                            <p className="text-gray-400 text-sm">
                            Analyzed 2m ago
                            </p>    
                        </div>
                    </div>

                </div>

                <div className="flex gap-5">
                        {["Overview", "Commits", "PRs", "Actions"].map((tab, i) => (
                            <button
                                key={i}
                                className="text-sm text-gray-400 hover:text-white border-b-2 border-transparent hover:border-blue-500 pb-1 transition"
                            >
                                {tab}
                            </button>
                        ))}
                </div>

                <div className="flex items-center gap-4">

                    <button className="px-3 py-1 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800">
                        Refresh
                    </button>

                    <button className="px-3 py-1 bg-blue-600 rounded-md text-white hover:bg-blue-700">
                        Sync Repo
                    </button>

                    <Bell className="text-gray-400 cursor-pointer" size={18} />
                </div>
            </div>
        </>
    )
}