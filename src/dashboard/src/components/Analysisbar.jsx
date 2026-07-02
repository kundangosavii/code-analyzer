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
    SearchCode,
    Gauge
} from "lucide-react";
import { useState } from "react";

export default function Analysisbar({ insights, impact, deadCode, complexity }) {
    console.log(complexity)
    return (
        <div className="w-96 h-[90vh] bg-[#080817] border-r border-gray-800 text-gray-300 flex flex-col p-4 overflow-hidden">

            <p className="text-xs text-gray-500 mb-4 shrink-0">REPOSITORY INSIGHTS</p>

            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">

                <div className="h-64 border-2 border-gray-900 rounded mt-4 p-3">
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
                            <p key={i} className="text-sm leading-relaxed text-gray-300 wrap-break-word">
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

                    {impact.map((item, index) => (
                        <div key={index} className="p-3">
                            {Object.entries(item).map(([key, value]) => (
                                <p key={key} className="text-sm text-gray-300 wrap-break-word">
                                    <span className="font-semibold uppercase text-gray-450">{key}: </span>
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </p>
                            ))}
                        </div>
                    ))}

                </div>

                <div className="h-64 border-2 border-gray-900 rounded mt-4 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#d1690031] border-[#ffb4ab33] text-[#d16900]">
                            <Trash2 className="text-[#ffb4ab] cursor-pointer" size={18} />
                        </div>
                        <div className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-full bg-[#d169000d] border-[#ffb4ab33] text-[#d16900]">
                            DEAD CODE
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        {deadCode && deadCode.length > 0 ? (
                            deadCode.slice(0, 2).map((item, index) => (
                                <p key={index} className="text-sm text-gray-300 wrap-break-word">
                                    {item}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No dead code found or loading...</p>
                        )}
                    </div>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#0099d11e] border-[#abd2ff33] text-[#0070d1]">
                            <Gauge className="text-[#abb6ff] cursor-pointer" size={18} />
                        </div>
                        <p className="text-xl font-bold text-gray-400">
                            {complexity ? (
                                <div>
                                    <span className="text-green-700 text-3xl">{complexity.complexityScore}</span>
                                    <span className="text-2xl">/100</span>
                                </div>

                            ) : (
                               <p className="text-sm text-gray-500"> 
                               <span className="text-green-700 text-3xl">0</span>
                               <span className="text-2xl">/100</span>
                               </p> 
                            )}
                        </p>
                        
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        {complexity ? (
                            <div>
                                <p className="text-sm text-gray-300 break-all">
                                    <span className="font-semibold text-gray-400">File:</span> {complexity.file}
                                </p>
                                <p className="text-sm text-gray-300 break-all">
                                    <span className="font-semibold text-gray-400">ImportedBy:</span> {typeof complexity.importedBy === 'object' ? JSON.stringify(complexity.importedBy) : String(complexity.importedBy)}
                                </p>
                                <p className="text-sm text-gray-300 break-all">
                                    <span className="font-semibold text-gray-400">Imports:</span> {typeof complexity.imports === 'object' ? JSON.stringify(complexity.imports) : String(complexity.imports)}
                                </p>
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-gray-400">InCycle:</span> {String(complexity.inCycle)}
                                </p>
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-gray-400">Complexity Score:</span> {complexity.complexityScore}
                                </p>
                            </div>

                        ) : (
                            <p className="text-sm text-gray-500 italic"> No complexity code found or loading...</p>
                        )}
                    </div>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">AI INSIGHTS</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

            </div>
        </div>
    );
}