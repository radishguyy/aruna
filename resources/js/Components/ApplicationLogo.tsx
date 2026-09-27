import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 200 60"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fontWeight="900" fontFamily="sans-serif" fill="currentColor">
                Aruna
            </text>
        </svg>
    );
}
