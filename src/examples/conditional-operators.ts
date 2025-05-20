import db, { executeQuery } from "../config/database";
import { TProduct } from "./query";

//use nullif,case,coalesce and cast operators
export const nullifExample = async (productId: number): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM products WHERE product_id = NULLIF($1, 0)",
      [productId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error using NULLIF operator:", error);
    throw error;
  }
}

export const caseExample = async (productId: number): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM products WHERE product_id = CASE WHEN $1 IS NOT NULL THEN $1 ELSE product_id END",
      [productId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error using CASE operator:", error);
    throw error;
  }
}

export const coalesceExample = async (productId: number): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM products WHERE product_id = COALESCE($1, product_id)",
      [productId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error using COALESCE operator:", error);
    throw error;
  }
}

export const castExample = async (productId: number): Promise<TProduct[]> => {
  try {
    const result = await executeQuery(
      "SELECT * FROM products WHERE product_id = CAST($1 AS INT)",
      [productId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error using CAST operator:", error);
    throw error;
  }
}
