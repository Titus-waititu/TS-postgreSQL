import db, { executeQuery } from "../config/database";

export interface TProduct {
  product_id?: number;
  name: string;
  price: number;
  stock_quantity: number;
  created_at?: Date;
}

export interface TOrder {
  order_id?: number;
  product_id: number;
  quantity_ordered: number;
  customer_name: string;
  order_date?: Date;
}

export const insertProduct = async (product: TProduct): Promise<number> => {
  try {
    const { name, price, stock_quantity } = product;
    const result = await executeQuery(
      "INSERT INTO products (name, price, stock_quantity) VALUES ($1, $2, $3) RETURNING product_id",
      [name, price, stock_quantity]
    );
    return result.rows[0].product_id;
  } catch (error) {
    console.error("Error inserting product:", error);
    throw error;
  }
};
export const insertMultipleProducts = async (
  products: TProduct[]
): Promise<void> => {
  const client = await db.getPool().connect();
  try {
    await client.query("BEGIN");
    const insertPromises = products.map((product) => {
      const { name, price, stock_quantity } = product;
      return client.query(
        "INSERT INTO products (name, price, stock_quantity) VALUES ($1, $2, $3)",
        [name, price, stock_quantity]
      );
    });
    await Promise.all(insertPromises);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting multiple products:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const insertOrder = async (order: TOrder): Promise<number> => {
  try {
    const { product_id, quantity_ordered, customer_name } = order;
    const result = await executeQuery(
      "INSERT INTO orders (product_id, quantity_ordered, customer_name) VALUES ($1, $2, $3) RETURNING order_id",
      [product_id, quantity_ordered, customer_name]
    );
    return result.rows[0].order_id;
  } catch (error) {
    console.error("Error inserting order:", error);
    throw error;
  }
};
export const queryProducts = async (): Promise<TProduct[]> => {
  try {
    const result = await executeQuery("SELECT * FROM products");
    return result.rows;
  } catch (error) {
    console.error("Error querying products:", error);
    throw error;
  }
=======
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
