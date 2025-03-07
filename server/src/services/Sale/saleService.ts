import Sale from '../../models/Sale/sales';
import { ISale } from '../../utils/interface';

export const getAllSales = async (
    page: number,
    limit: number,
    search?: string,
    couponUsed?: boolean,
    purchaseMethod?: string
) => {
    const skip = (page - 1) * limit;
    const query: any = {};

    // Apply search filter
    if (search) {
        query.$or = [
            { 'customer.email': { $regex: search, $options: 'i' } },
            { storeLocation: { $regex: search, $options: 'i' } },
            { 'items.name': { $regex: search, $options: 'i' } },
        ];
    }

    if (couponUsed !== undefined) {
        query.couponUsed = couponUsed;
    }

    if (purchaseMethod) {
        query.purchaseMethod = purchaseMethod;
    }

    const sales: ISale[] = await Sale.find(query)
        .sort({ saleDate: -1 })
        .skip(skip)
        .limit(limit);
    const total = await Sale.countDocuments(query);

    return { sales, total };
};
