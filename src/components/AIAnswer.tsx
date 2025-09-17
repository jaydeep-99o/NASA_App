import ReactMarkdown from "react-markdown";
import type { QAResponse } from "../lib/types";

export default function AIAnswer({ data }: { data: QAResponse }) {
    return (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{data.answer}</ReactMarkdown>
            </div>
            <div className="mt-3 text-sm">
                <div className="font-medium mb-1">Citations</div>
                <ul className="list-disc ml-5">
                    {data.citations.map(c => <li key={c.id}>{c.label}</li>)}
                </ul>
            </div>
            {data.evidence?.length ? (
                <div className="mt-3 text-xs opacity-80">
                    <div className="font-medium mb-1">Evidence</div>
                    {data.evidence.map((e, i) => <p key={i} className="mb-1">— {e.text}</p>)}
                </div>
            ) : null}
        </div>
    );
}
