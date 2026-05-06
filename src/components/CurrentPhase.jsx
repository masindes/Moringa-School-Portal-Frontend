import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"];

const CurrentPhase = () => {
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    const token = localStorage.getItem("token");
    if (!studentId || !token) { setLoading(false); return; }

    fetch(`${API_URL}/students/${studentId}/current_phase`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { setPhase(d.current_phase); setLoading(false); })
      .catch(() => { setError("Failed to load phase."); setLoading(false); });
  }, []);

  const phaseIndex = phases.findIndex((p) => phase && phase.includes(p.split(" ")[1]));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-3">🚀 Current Phase</h2>
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <p className="text-lg font-semibold text-blue-600 text-center mb-4">{phase || "Not assigned"}</p>
          <div className="flex justify-between items-center gap-1">
            {phases.map((p, i) => (
              <div key={p} className="flex flex-col items-center flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${i <= phaseIndex ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"}`}>
                  {i + 1}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 text-center hidden sm:block">{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentPhase;
