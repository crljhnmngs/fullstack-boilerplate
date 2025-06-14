import { ReactNode } from 'react';

// Props for Table
type TableProps = {
    children: ReactNode; // Table content (thead, tbody, etc.)
    className?: string; // Optional className for styling
};

// Props for TableHeader
type TableHeaderProps = {
    children: ReactNode; // Header row(s)
    className?: string; // Optional className for styling
};

// Props for TableBody
type TableBodyProps = {
    children: ReactNode; // Body row(s)
    className?: string; // Optional className for styling
};

// Props for TableRow
type TableRowProps = {
    children: ReactNode; // Cells (th or td)
    className?: string; // Optional className for styling
};

// Props for TableCell
type TableCellProps = {
    children: ReactNode; // Cell content
    isHeader?: boolean; // If true, renders as <th>, otherwise <td>
    className?: string; // Optional className for styling
} & Record<string, unknown>;

// Table Component
const Table = ({ children, className }: TableProps) => {
    return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader = ({ children, className }: TableHeaderProps) => {
    return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody = ({ children, className }: TableBodyProps) => {
    return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow = ({ children, className }: TableRowProps) => {
    return <tr className={className}>{children}</tr>;
};

// TableCell Component
const TableCell = ({
    children,
    isHeader = false,
    className,
    ...props
}: TableCellProps) => {
    const CellTag = isHeader ? 'th' : 'td';
    return (
        <CellTag {...props} className={` ${className}`}>
            {children}
        </CellTag>
    );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
