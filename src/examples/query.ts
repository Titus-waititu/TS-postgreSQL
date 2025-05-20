import db, { executeQuery } from "../config/database";

export interface Tproduct {
    product_id?: number;
    name: string;
    stock_quantity: number;
    price:number;
    created_at?: Date;
}
export interface Torders{
      order_id: number;
      product_id: number;
     quantity_ordered:number;
     customer_name: string;
     order_date: Date;
}


// Insert a single product into the database
export const insertOneProduct = async (product: Tproduct): Promise<number | undefined> => {
    try {
        const res = await executeQuery(
            'INSERT INTO products (name, stock_quantity, price) VALUES ($1, $2, $3) RETURNING product_id',
            [product.name, product.stock_quantity, product.price]
        );
        const insertedId = res.rows[0]?.product_id;
        console.log(`Product inserted with ID: ${insertedId}`);
        return insertedId;
    } catch (err) {
        console.error('Error inserting data:', err);
        throw err;
    }
}
// Insert multiple products in a transaction
export const insertMultipleproducts = async (products: Tproduct[]): Promise<void> => {
    const client = await db.getPool().connect();
    try {
        await client.query('BEGIN');
        for (const product of products) {
            await client.query(
            'INSERT INTO products (name, stock_quantity,price) VALUES ($1, $2, $3 ) RETURNING product_id',
            [product.name, product.stock_quantity, product.price]
            );
        }
        await client.query('COMMIT');
        console.log(`${products.length} products inserted successfully`);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting multiple products:', err);
        throw err;
    } finally {
        client.release();
    }
}

// Query all products
export const query = async (): Promise<Tproduct[]> => {
    try {
        const res = await executeQuery('SELECT * FROM products');
        console.log(`Retrieved ${res.rows.length} products`);
        return res.rows as Tproduct[];
    } catch (err) {
        console.error('Error querying data:', err);
        throw err;
    }
};

// Delete all products from the database
export const deleteAllProducts = async (): Promise<void> => {
    try {
        const res = await executeQuery('DELETE FROM products');
        console.log(`Deleted ${res.rowCount} products`);
    } catch (err) {
        console.error('Error deleting data:', err);
        throw err;
    }
};
