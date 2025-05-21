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
        const nullifResult = await nullifExample(19);
        console.log('NULLIF Example Result:', nullifResult);

        // 5.castExample
        // const castResult = await castExample(1);

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();