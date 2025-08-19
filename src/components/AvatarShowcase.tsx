import React from "react";

interface AvatarShowcaseProps {
  src: string;
  alt: string;
}

const AvatarShowcase: React.FC<AvatarShowcaseProps> = ({ src, alt }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer wrapper for gradient border */}
      <div className="relative w-48 h-48 rounded-full p-[3px] bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500">
        {/* Inner circle for the actual image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default AvatarShowcase;
