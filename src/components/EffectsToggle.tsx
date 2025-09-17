import { useEffect, useState } from "react";

export default function EffectsToggle() {
    const [on, setOn] = useState(() => (localStorage.getItem("effects") ?? "on") !== "off");

    useEffect(() => {
        document.documentElement.classList.toggle("no-effects", !on);
        localStorage.setItem("effects", on ? "on" : "off");
    }, [on]);

    return (
        <button
            onClick={() => setOn(v => !v)}
            className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Toggle background animations"
        >
            Effects: {on ? "On" : "Off"}
        </button>
    );
}
