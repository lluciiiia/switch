import React from "react";

interface ProgressCircleProps {
  percent: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percent }) => {
  return (
    <div className="text-center">
      <div className="w-36 h-36 border-2 border-white rounded-full mb-2 flex justify-center items-center flex-col">
        <p className="text-5xl">{percent}</p>
        <p>Percent</p>
      </div>
    </div>
  );
};

export default ProgressCircle;
