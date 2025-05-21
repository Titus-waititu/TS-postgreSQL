import { executeQuery } from '../config/database';

// GROUPING SETS
export async function getSalesByGroupingSets() {
    const query = `
        SELECT 
            customer_name,
            product_id,
            SUM(quantity_ordered) AS total_quantity
        FROM orders
        GROUP BY GROUPING SETS (
            (customer_name),
            (product_id),
            (customer_name, product_id),
            ()
        )
        ORDER BY customer_name, product_id;
    `;
    const result = await executeQuery(query);
    return result.rows[0].total_quantity;
}

// ROLLUP
export async function getSalesByRollup() {
    const query = `
        SELECT 
            customer_name,
            product_id,
            SUM(quantity_ordered) AS total_quantity
        FROM orders
        GROUP BY ROLLUP (customer_name, product_id)
        ORDER BY customer_name, product_id;
    `;
    const result = await executeQuery(query);
    return result.rows;
}

// CUBE
export async function getSalesByCube() {
    const query = `
        SELECT 
            customer_name,
            product_id,
            SUM(quantity_ordered) AS total_quantity
        FROM orders
        GROUP BY CUBE (customer_name, product_id)
        ORDER BY customer_name, product_id;
    `;
    const result = await executeQuery(query);
    return result.rows;
}
