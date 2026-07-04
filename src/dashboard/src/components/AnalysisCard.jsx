import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AnalysisCard({ aiInsights }) {
    return (
        <div className="text-gray-200 no-scrollbar">
            <h2 className="mb-4 text-2xl font-bold text-[#ffabe4]">AI Insights</h2>

            <div className="overflow-x-auto p-4 text-sm leading-7 text-gray-300">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ children }) => (
                            <table className="w-full border-collapse border border-gray-700 text-left">
                                {children}
                            </table>
                        ),
                        thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
                        th: ({ children }) => (
                            <th className="border border-gray-700 px-3 py-2 font-semibold text-[#ffabe4]">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="border border-gray-700 px-3 py-2 align-top">
                                {children}
                            </td>
                        ),
                        p: ({ children }) => <p className="mb-3 mt-5 text-xl">{children}</p>,
                    }}
                >
                    {aiInsights}
                </ReactMarkdown>
            </div>
        </div>
    );
}