
import { initializeTables } from './config/database';
import { query, insertMultipleproducts, insertOneProduct, Tproduct, Torders, deleteAllProducts } from './examples/query';

// Self-executing async function to run the imported code
(async () => {
    try {
        // 1. Create tables if they don't exist
        await initializeTables();

        // 2. Insert a test product
        const productId = await insertOneProduct({ product_id: 1, name: 'Headphones', stock_quantity: 100, price:150 });
        console.log(`Inserted product with ID: ${productId}`);

        // 3. Insert multiple products with a transaction
        const productsToInsert: Tproduct[] = [
            { product_id: 2, name: 'Speaker', stock_quantity: 200, price:200 },
            { product_id: 3, name: 'Amplifier', stock_quantity: 50, price:250 },
            { product_id: 4, name: 'Phones', stock_quantity: 60, price:300 },
            { product_id: 5, name: 'Laptop', stock_quantity: 90, price:350 },
            { product_id: 6, name: 'Chargers', stock_quantity: 150, price:400 },
            { product_id: 7, name: 'adapters', stock_quantity: 300, price:500 },
        ];
        await insertMultipleproducts(productsToInsert);
        
        const ordersToAdd: Torders[] = [
            { order_id: 1, product_id: 1, quantity_ordered: 2, customer_name: 'Mibey', order_date: new Date('2025-04-10') },
            { order_id: 2, product_id: 2, quantity_ordered: 4, customer_name: 'James', order_date: new Date('2025-04-13') },
            { order_id: 3, product_id: 3, quantity_ordered: 6, customer_name: 'Colkimi', order_date: new Date('2025-04-15') },
            { order_id: 4, product_id: 4, quantity_ordered: 9, customer_name: 'Mike', order_date: new Date('2025-04-17') },
            { order_id: 5, product_id: 5, quantity_ordered: 12, customer_name: 'Simon', order_date: new Date('2025-04-20') },
            { order_id: 6, product_id: 6, quantity_ordered: 1, customer_name: 'Bruno', order_date: new Date('2025-04-11') },
            { order_id: 7, product_id: 7, quantity_ordered: 6, customer_name: 'Titus', order_date: new Date('2025-04-16') },
        ];
        await insertMultipleproducts(productsToInsert);
        // 4. Query all products to verify
        const products = await query();
        console.log('All products in database:');
        console.table(products);

        // 5. Delete all products
        // await deleteAllProducts();

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();