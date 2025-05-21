
import { initializeTables } from './config/database';
import { insertProduct, insertMultipleProducts, insertOrder } from './examples/query';
import { filterProductsByPrice, filterOrdersByDate } from './examples/filter';
import { nullifExample, caseExample, coalesceExample, castExample } from './examples/conditional-operators';

(async () => {
    try {
        // user operations

        // 1. Create tables if it doesn't exist
        // await initializeTables();

        // 2. Insert a single product
        // const productId = await insertProduct({
        //     name: 'Sample Product',
        //     price: 19.99,
        //     stock_quantity: 100,
        // });

        // 3. Insert multiple products
        const products = [
            { name: 'Product 1', price: 10.99, stock_quantity: 50 },
            { name: 'Product 2', price: 15.99, stock_quantity: 30 },
            { name: 'Product 3', price: 25.99, stock_quantity: 20 },
        ];
        // await insertMultipleProducts(products);
        // console.log('Inserted product with ID:', productId);

        // 4. nullifExample
        const nullifResult = await nullifExample(1);
        console.log('NULLIF Example Result:', nullifResult);

        // 5.castExample
        const castResult = await castExample(1);

import { initializeTables } from './config/database';
import { query, insertMultipleproducts, insertOneProduct, Tproduct, Torders, deleteAllProducts } from './examples/query';

// Self-executing async function to run the imported code
(async () => {
    try {
        // 1. Create tables if they don't exist
        await initializeTables();

        // 2. Insert a test product
        const productId = await insertOneProduct({ name: 'Headphones', stock_quantity: 100, price:150 });
        console.log(`Inserted product with ID: ${productId}`);

        // 3. Insert multiple products with a transaction
        const productsToInsert: Tproduct[] = [
            { name: 'Speaker', stock_quantity: 200, price:200 },
            {  name: 'Amplifier', stock_quantity: 50, price:250 },
            {  name: 'Phones', stock_quantity: 60, price:300 },
            {  name: 'Laptop', stock_quantity: 90, price:350 },
            {  name: 'Chargers', stock_quantity: 150, price:400 },
            {  name: 'adapters', stock_quantity: 300, price:500 },
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