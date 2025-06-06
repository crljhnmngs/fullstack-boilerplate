import { Sale } from '../../models/Sale/sales';
import { ISale } from '../../utils/interface/sales';

export const getAllSalesService = async (
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

export const createSaleService = async (saleData: ISale) => {
    try {
        const newSale = new Sale(saleData);
        await newSale.save();
        return newSale;
    } catch (error) {
        console.log(error);
        throw new Error('Error creating sale');
    }
};

export const updateSaleService = async (
    id: string,
    saleData: Partial<ISale>
) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(id, saleData, {
            new: true,
            runValidators: true,
        });

        return updatedSale;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update sale');
    }
};

export const deleteSaleService = async (id: string) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(id);

        return deletedSale;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update sale');
    }
};

export const deleteMultipleSalesService = async (ids: string[]) => {
    const existingCount = await Sale.countDocuments({ _id: { $in: ids } });

    if (existingCount === 0) {
        throw new Error('No matching sales found');
    }

    // Delete the matching sales and get the result
    const deleteResult = await Sale.deleteMany({ _id: { $in: ids } });

    return {
        deletedCount: deleteResult.deletedCount,
        message: `${deleteResult.deletedCount} sales deleted successfully!`,
    };
};
