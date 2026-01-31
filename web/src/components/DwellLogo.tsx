import React from 'react';

interface DwellLogoProps {
    className?: string;
}

const DwellLogo: React.FC<DwellLogoProps> = ({ className = "" }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                className="dwell-logo-mark"
                d="M12 2L2 12H5V22H19V12H22L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                className="dwell-logo-mark"
                d="M12 18L15 15M12 18L9 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DwellLogo;
