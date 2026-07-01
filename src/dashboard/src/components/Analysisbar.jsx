import {
    Folder,
    GitBranch,
    Shield,
    Settings,
    Layout,
    Plus,
    Lock,
    MessageCircleWarning,
    Trash2,
    SearchCode
} from "lucide-react";
import { useState } from "react";

export default function Analysisbar({ insights }) {
    console.log(insights)
    return (
        <div className="w-96 h-[90vh] bg-[#080817] border-r border-gray-800 text-gray-300 flex flex-col p-4 overflow-hidden">

            <p className="text-xs text-gray-500 mb-4 shrink-0">REPOSITORY INSIGHTS</p>

            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">

                <div className="h-56 border-2 border-gray-900 rounded mt-4 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#bdffab0d] border-[#bdffab33] text-[#b2ffab]">
                            <SearchCode className="text-[#b2ffab] cursor-pointer" size={18} />
                        </div>
                        <div className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-full bg-[#bdffab0d] border-[#bdffab33] text-[#b2ffab]">
                            INSIGHTS
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        {insights.slice(0, 2).map((insight, i) => (
                            <p key={i} className="text-sm leading-relaxed text-gray-300">
                                {insight}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-4 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#ffb3ab31] border-[#ffb4ab33] text-[#ffb4ab]">
                            <MessageCircleWarning className="text-[#ffb4ab] cursor-pointer" size={18} />
                        </div>
                        <div className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-full bg-[#ffb4ab0d] border-[#ffb4ab33] text-[#ffb4ab]">
                            High Impact
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        {insights.slice(0, 2).map((insight, i) => (
                            <p key={i} className="text-sm leading-relaxed text-gray-300">
                                {insight}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-4 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#d1690031] border-[#ffb4ab33] text-[#d16900]">
                            <Trash2 className="text-[#ffb4ab] cursor-pointer" size={18} />
                        </div>
                        <div className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-full bg-[#d169000d] border-[#ffb4ab33] text-[#d16900]">
                            DEAD CODE
                        </div>
                    </div>

                    <p className="mt-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">COMPLEXITY</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">DEAD CODE</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">AI INSIGHTS</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

            </div>
        </div>
    );
}