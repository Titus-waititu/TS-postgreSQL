import db, { executeQuery } from "../config/database";
import { TProduct } from "./query";

// Improving Readability of Complex Queries

export const getProductDetails = async (
  productId: number
): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      `
        WITH product_details AS (
            SELECT 
            p.product_id,
            p.name,
            p.price,
            p.stock_quantity,
            o.quantity_ordered
            FROM products p
            LEFT JOIN orders o ON p.product_id = o.product_id
            WHERE p.product_id = $1
        )
        SELECT * FROM product_details;
        `,
      [productId]
    );
    console.log((result.rows))
    return result.rows;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Data Deduplication or Ranking

export const getTopSellingProducts = async (
  limit: number
): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      `
        WITH ranked_products AS (
            SELECT 
            p.product_id,
            p.name,
            SUM(o.quantity_ordered) AS total_quantity,
            ROW_NUMBER() OVER (ORDER BY SUM(o.quantity_ordered) DESC) AS rank
            FROM products p
            LEFT JOIN orders o ON p.product_id = o.product_id
            GROUP BY p.product_id, p.name
        )
        SELECT * FROM ranked_products WHERE rank <= $1;
        `,
      [limit]
    );
    console.log((result.rows))
    return result.rows;
  } catch (error) {
    console.error("Error fetching top-selling products:", error);
    throw error;
  }
};
// Filtering Aggregated Data

export const getProductsAboveAveragePrice = async (): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      `
        WITH average_price AS (
        SELECT AVG(price::NUMERIC) AS avg_price FROM products
        )
        SELECT * FROM products 
        WHERE price::NUMERIC > (SELECT avg_price FROM average_price);
  `
    );
    console.log(result.rows as TProduct[])
    return result.rows as TProduct[];
  } catch (error) {
    console.error("Error fetching products above average price:", error);
    throw error;
  }
};
