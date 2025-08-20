import React from 'react';
import type { IconType } from 'react-icons';

interface NoDataFoundProps {
  icon: IconType;
  title: string;
  message: string;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
  iconColor?: string;
  messageColor?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  icon: Icon,
  title,
  message,
  bgColor = 'bg-yellow-900/20',
  borderColor = 'border-yellow-700',
  titleColor = 'text-yellow-400',
  iconColor = 'text-yellow-400',
  messageColor = 'text-gray-300',
}) => {
  return (
    <div className="text-center py-12">
      <div className={`
        ${bgColor} ${borderColor} rounded-lg p-6 max-w-md mx-auto
      `}>
        <Icon className={`text-4xl ${iconColor} mx-auto mb-4`} />
        <h2 className={`text-xl font-semibold ${titleColor} mb-2`}>{title}</h2>
        <p className={`${messageColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default NoDataFound;