import { executeQuery, initializeTables } from '../config/database';
import { insertProduct, insertMultipleProducts, insertOrder,TProduct,TOrder,queryProducts,TorderWithProduct,queryOrders } from '../examples/query';

(async () => {
    try {
        // 1. Create tables if they don't exist
        await initializeTables();

        // 2. Insert a test product
        const productId = await insertProduct({ name: 'Headphones', stock_quantity: 100, price:150 });
        console.log(`Inserted product with ID: ${productId}`);

        // 3. Insert multiple products with a transaction
        const productsToInsert: TProduct[] = [
            { name: 'Speaker', stock_quantity: 200, price:200 },
            {  name: 'Amplifier', stock_quantity: 50, price:250 },
            {  name: 'Phones', stock_quantity: 60, price:300 },
            {  name: 'Laptop', stock_quantity: 90, price:350 },
            {  name: 'Chargers', stock_quantity: 150, price:400 },
            {  name: 'adapters', stock_quantity: 300, price:500 },
        ];
        await insertMultipleProducts(productsToInsert);
        
        const ordersToAdd: TOrder[] = [
            { order_id: 1, product_id: 1, quantity_ordered: 2, customer_name: 'Mibey', order_date: new Date('2025-04-10') },
            { order_id: 2, product_id: 2, quantity_ordered: 4, customer_name: 'James', order_date: new Date('2025-04-13') },
            { order_id: 3, product_id: 3, quantity_ordered: 6, customer_name: 'Colkimi', order_date: new Date('2025-04-15') },
            { order_id: 4, product_id: 4, quantity_ordered: 9, customer_name: 'Mike', order_date: new Date('2025-04-17') },
            { order_id: 5, product_id: 5, quantity_ordered: 12, customer_name: 'Simon', order_date: new Date('2025-04-20') },
            { order_id: 6, product_id: 6, quantity_ordered: 1, customer_name: 'Bruno', order_date: new Date('2025-04-11') },
            { order_id: 7, product_id: 7, quantity_ordered: 6, customer_name: 'Titus', order_date: new Date('2025-04-16') },
        ];
        
        for (const order of ordersToAdd) {
            await insertOrder(order);
        }
        // 4. Query all products to verify
        // const products = await queryProducts();
        // console.log('All products in database:');
        // console.table(products);

        const orders = await queryOrders();
        console.log('All orders in database:');
        console.table(orders);
         
         const query1 = `
           SELECT 
           orders.order_id AS order_id,
           orders.quantity_ordered,
            products.product_id AS product_id,
            products.name AS product_name,
             products.price
            FROM orders
          INNER JOIN products ON orders.product_id = products.product_id
  `;
  const result1 = await executeQuery(query1);
  console.log('Orders with product info (INNER JOIN result):');
  console.table( result1.rows);

 const query2 = `
    SELECT 
      orders.order_id AS order_id,
      orders.quantity_ordered,
      products.product_id AS product_id,
      products.name AS product_name,
      products.price
    FROM orders
    LEFT JOIN products ON orders.product_id = products.product_id
  `;
  const result2 = await executeQuery(query2);
  console.log('Orders with product info (LEFT JOIN result):');
  console.table(result2.rows);

    const query3 = `
    SELECT 
      orders.order_id AS order_id,
      orders.quantity_ordered,
      products.product_id AS product_id,
      products.name AS product_name,
      products.price
    FROM orders
    RIGHT JOIN products ON orders.product_id = products.product_id
  `;
  const result3 = await executeQuery(query3);
  console.log('Orders with product info (RIGHT JOIN result):');
  console.table(result3.rows);
   
const query4 = `
    SELECT 
      orders.order_id AS order_id,
      orders.quantity_ordered,
      products.product_id AS product_id,
      products.name AS product_name,
      products.price
    FROM orders
    FULL OUTER JOIN products ON orders.product_id = products.product_id
  `;
  const result4 = await executeQuery(query4);
  console.log('Orders with product info (FULL OUTER JOIN result):');
  console.table(result4.rows);
   
    const query5 = `
    SELECT 
      products.product_id AS product_id,
      products.name AS product_name,
      products.price,
      orders.order_id AS order_id,
      orders.quantity_ordered
    FROM products
    CROSS JOIN orders
  `;
  const result5 = await executeQuery(query5);
  console.log('Orders with product info (NATURAL JOIN result):');
  console.table(result5.rows);

      const query6 = `
    SELECT 
      products.product_id AS product_id,
      products.name AS product_name,
      products.price,
      orders.order_id AS order_id,
      orders.quantity_ordered
    FROM products
    NATURAL JOIN orders
  `;
  const result6 = await executeQuery(query6);
  console.log('Orders with product info (NATURAL JOIN result):');
  console.table(result6.rows);

    // Example of a self join: Find pairs of products with the same price
    const selfJoinQuery = `
      SELECT 
        p1.product_id AS product1_id,
        p1.name AS product1_name,
        p2.product_id AS product2_id,
        p2.name AS product2_name,
        p1.price
      FROM products p1
      INNER JOIN products p2 ON p1.price = p2.price AND p1.product_id < p2.product_id
    `;
    const selfJoinResult = await executeQuery(selfJoinQuery);
    console.log('Pairs of products with the same price (SELF JOIN result):');
    console.table(selfJoinResult.rows);
    
        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();
