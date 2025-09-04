import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-[gradient_15s_ease_infinite] bg-[length:200%_200%]" />
  );
};

export default AnimatedBackground;