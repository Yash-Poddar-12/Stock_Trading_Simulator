// src/components/BullEyes.js
import React from 'react';

const BullEyes = ({ offsetX, offsetY, isClosed }) => {
  // Define centers for left and right eye sockets (example positions)
  const leftEyeCenter = { x: 60, y: 70 };
  const rightEyeCenter = { x: 140, y: 70 };
  const maxOffset = 5; // Pupils can move ±5px

  // Calculate pupil positions
  const leftPupilX = leftEyeCenter.x + offsetX * maxOffset;
  const leftPupilY = leftEyeCenter.y + offsetY * maxOffset;
  const rightPupilX = rightEyeCenter.x + offsetX * maxOffset;
  const rightPupilY = rightEyeCenter.y + offsetY * maxOffset;

  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      style={{ userSelect: 'none' }}
    >
      {/* Bull head shape */}
      <path
        d="M 10,130 C 10,50 60,10 100,10 140,10 190,50 190,130 Z"
        fill="#a52a2a"
      />
      {/* Eye sockets */}
      <ellipse cx="60" cy="70" rx="20" ry="15" fill="#fff" />
      <ellipse cx="140" cy="70" rx="20" ry="15" fill="#fff" />
      {/* Pupils: When isClosed is true, fill becomes transparent */}
      <circle cx={leftPupilX} cy={leftPupilY} r="5" fill={isClosed ? "transparent" : "#000"} />
      <circle cx={rightPupilX} cy={rightPupilY} r="5" fill={isClosed ? "transparent" : "#000"} />
    </svg>
  );
};

export default BullEyes;
