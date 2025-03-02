import { Item, Sale } from '../../../store/sales/types';
import { capitalizeFirstLetter, formatDate } from '../../../lib/utils';
import { SalesTableProps } from '@/types/global';

export function SalesTable({ sales, isLoading }: SalesTableProps) {
    return (
        <div className="w-full border-collapse border border-gray-300 rounded-lg overflow-x-auto">
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center w-32">
                            Sale Date
                        </th>
                        <th className="px-4 py-2 text-center w-80">
                            Items Name
                        </th>
                        <th className="px-4 py-2 text-center w-40">
                            Store Location
                        </th>
                        <th className="px-4 py-2 text-center w-56">
                            Customer Email
                        </th>
                        <th className="px-4 py-2 text-center w-24">
                            Coupon Used
                        </th>
                        <th className="px-4 py-2 text-center w-32">
                            Purchase Method
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                Loading sales data...
                            </td>
                        </tr>
                    ) : sales.length > 0 ? (
                        sales.map((sale: Sale, index) => (
                            <tr
                                key={index}
                                className="odd:bg-gray-100 even:bg-white"
                            >
                                <td className="px-4 py-2 text-center">
                                    {formatDate(sale.saleDate)}
                                </td>
                                <td className="px-4 py-2">
                                    {sale.items
                                        .map((item: Item) =>
                                            capitalizeFirstLetter(item.name)
                                        )
                                        .join(', ')}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {sale.storeLocation}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {sale.customer.email}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {sale.couponUsed ? 'Yes' : 'No'}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {sale.purchaseMethod}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                No sales data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
