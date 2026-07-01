import {
    Folder,
    GitBranch,
    Shield,
    Settings,
    Layout,
    Plus,
    Lock,
} from "lucide-react";
import { useState } from "react";

export default function Analysisbar({ repos, onRepoClick }) {
    return (
        <div className="w-96 h-[90vh] bg-[#080817] border-r border-gray-800 text-gray-300 flex flex-col p-4 overflow-hidden">
            
            <p className="text-xs text-gray-500 mb-4 shrink-0">REPOSITORY INSIGHTS</p>
            
            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                
                <div className="h-56 border-2 border-gray-900 rounded mt-4 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">INSIGHTS</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
                </div>

                <div className="h-56 border-2 border-gray-900 rounded mt-6 p-3">
                    <p className="text-xl font-bold text-red-400 mt-2">IMPACT</p>
                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsam explicabo maxime. Velit eius adipisci beatae. Unde, voluptates adipisci consectetur sequi, animi quisquam aliquid ea sapiente doloribus porro quam facere?</p>
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