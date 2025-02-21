import React from "react";

const CurrentPhase = () => {
  // Mock Data
  const currentPhase = "Phase 3 - Advanced Web Development";

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">🚀 Current Phase</h2>
      <p className="text-gray-700 mt-2">{currentPhase}</p>
    </div>
  );
};

export default CurrentPhase;
