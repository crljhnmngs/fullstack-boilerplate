import Sale from '../models/sales';
import { ISale } from '../utils/interface';

export const getAllSales = async (
    page: number,
    limit: number,
    search: string
) => {
    const skip = (page - 1) * limit;

    const query = search
        ? {
              $or: [
                  { 'customer.email': { $regex: search, $options: 'i' } },
                  { storeLocation: { $regex: search, $options: 'i' } },
                  { 'items.name': { $regex: search, $options: 'i' } },
              ],
          }
        : {};

    const sales: ISale[] = await Sale.find(query).skip(skip).limit(limit);
    const total = await Sale.countDocuments(query);

    return { sales, total };
};
