import React from "react";

const CurrentPhase = () => {
  const currentPhase = "Phase 1 - Software Engineering";

  return (
    <div className="bg-white p-6 pt-16 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-3">🚀 Current Phase</h2>

      {/* Current Phase Text */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <p className="text-lg font-semibold text-blue-600 text-center">{currentPhase}</p>
      </div>
    </div>
  );
};

export default CurrentPhase;
