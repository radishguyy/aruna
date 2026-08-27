import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
