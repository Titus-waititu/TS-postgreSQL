import db, { executeQuery } from "../config/database";
import { TProduct,TOrder } from "./query";

export const filterProductsByPrice = async (minPrice: number, maxPrice: number): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM products WHERE price BETWEEN $1 AND $2",
      [minPrice, maxPrice]
    );
    return result.rows;
  } catch (error) {
    console.error("Error filtering products by price:", error);
    throw error;
  }
};

export const filterOrdersByDate = async (startDate: string, endDate: string): Promise<TOrder[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM orders WHERE order_date BETWEEN $1 AND $2",
      [startDate, endDate]
    );
    return result.rows;
  } catch (error) {
    console.error("Error filtering orders by date:", error);
    throw error;
  }
};