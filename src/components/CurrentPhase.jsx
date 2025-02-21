import React from "react";

const CurrentPhase = () => {
  // Mock Data
  const currentPhase = "Phase 3 - Advanced Web Development";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-16">
      <h2 className="text-3xl font-bold text-gray-800">🚀 Current Phase</h2>
      <p className="text-gray-700 mt-4 text-xl">{currentPhase}</p>
    </div>
  );
};

export default CurrentPhase;
