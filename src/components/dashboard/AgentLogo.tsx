import React from "react";

const AgentLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Circle */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
        <span className="text-white text-xl font-bold"></span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      </h1>
    </div>
  );
};

export default AgentLogo;