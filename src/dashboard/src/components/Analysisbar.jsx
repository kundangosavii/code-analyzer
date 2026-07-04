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
    Gauge,
    BrainCircuit
} from "lucide-react";
import { useState } from "react";

import { AnalysisCard } from "./AnalysisCard";

export default function Analysisbar({ insights, impact, deadCode, complexity, aiInsights, aiInsightLoading, onGetAiInsights }) {

    const [showAnalysisCard, setShowAnalysisCard] = useState(false);

    return (
        <div className="w-96 h-[90vh] bg-[#080817] border-r border-gray-800 text-gray-300 flex flex-col p-4 overflow-hidden">

            <div className="shrink-0 flex items-center justify-between mb-4">
                <p className="text-x text-gray-300 font-bold font-sans">REPOSITORY INSIGHTS</p>

                <button className="inline-flex items-center justify-center rounded-md border border-[#baabff33] bg-[#b5abff0f] px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#b1abff] transition hover:bg-[#ffabf018] hover:border-[#ffabfb55]">
                    Export analysis
                </button>
            </div>

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
                        {insights && insights.length != 0 ? (
                            insights.slice(0, 2).map((insight, i) => (
                                <p key={i} className="text-sm leading-relaxed text-gray-300 wrap-break-word">
                                    {insight}
                                </p>
                            ))

                        ) : (
                            <p className="text-sm italic text-gray-500">Please select the repository to get insights</p>

                        )}
                    </div>
                </div>

                <div className="h-64 border-2 border-gray-900 rounded mt-4 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#ffb3ab31] border-[#ffb4ab33] text-[#ffb4ab]">
                            <MessageCircleWarning className="text-[#ffb4ab] cursor-pointer" size={18} />
                        </div>
                        <div className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-full bg-[#ffb4ab0d] border-[#ffb4ab33] text-[#ffb4ab]">
                            High Impact
                        </div>
                    </div>


                    <div className="mt-4 flex flex-col wrap-break-word">
                        {impact && impact.length != 0 ? (
                            impact.map((item, index) => (
                                <div key={index} className="p-3">
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-gray-200">File:</span> {item.file}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-gray-200">Direct:</span> {item.direct || "None"}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-gray-200">Indirect:</span> {item.indirect || "None"}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-gray-200">Total impacted:</span> {item.totalImpactedFiles}
                                    </p>
                                </div>
                            ))

                        ) : (
                            <p className="text-sm italic text-gray-500">Please select the file to get impact analysis of file</p>
                        )}

                    </div>
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
                            <p className="text-sm text-gray-500 italic">Please select the repository to get insights</p>
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
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-white text-xl">Complexity Score:</span><span className="font-bold text-xl text-green-700">{complexity.complexityScore}</span>
                                </p>
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
                            </div>

                        ) : (
                            <p className="text-sm text-gray-500 italic"> Please select the file to get complexity score</p>
                        )}
                    </div>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <div className="flex flex-row  items-center justify-between">
                        <div className="px-2 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl bg-[#ffabf022] border-[#ffabfb33] text-[#b2ffab]">
                            <BrainCircuit className="text-[#ffabe4] cursor-pointer" size={18} />
                        </div>
                        <button className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase border rounded-sm bg-[#ffabf022] border-[#ffabfb33] text-[#ffabe4]"
                            onClick={onGetAiInsights}
                            disable={aiInsightLoading}
                        >
                            {
                                aiInsightLoading ? (
                                    <>
                                        <span className="h-3.5 w-3.5 border-2">
                                            Loading
                                        </span>
                                    </>
                                ) : (
                                    "Get AI-Insights"
                                )
                            }
                        </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        {aiInsightLoading ? (
                            <p className="text-sm text-gray-400">Generating AI insight...</p>
                        ) : aiInsights ? (
                            <>
                                <button
                                    onClick={() => setShowAnalysisCard((prev) => !prev)}
                                    className="w-full text-left rounded-xl border border-[#ffabfb33] bg-[#ffabf00f] p-3 text-sm text-[#ffabe4] hover:bg-[#ffabf018] transition"
                                >
                                    Your insights are ready, click to review
                                </button>

                                {showAnalysisCard && (
                                    <div className="fixed inset-0 z-50 bg-black/70">
                                        <div className="flex h-full w-full items-center justify-center p-4">
                                            <div className="relative h-[90vh] w-[90vw] max-w-6xl rounded-2xl border border-[#bfabff33] bg-[#080817]/90 p-6 shadow-2xl backdrop-blur-md overflow-auto no-scrollbar">
                                                <button
                                                    onClick={() => setShowAnalysisCard(false)}
                                                    className="absolute right-4 top-4 rounded-md border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-white/10"
                                                >
                                                    Close
                                                </button>

                                                <AnalysisCard aiInsights={aiInsights} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500 italic">Click the button to generate AI insights.</p>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}