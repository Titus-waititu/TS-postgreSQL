import db, { executeQuery } from "../config/database";
import { TProduct,TOrder } from "./query";

export interface TProductOrder {
    product_id: number;
    product_name: string;
    price: string;
    order_id: number;
    quantity_ordered: number;
    customer_name: string;
    order_date: Date;
}
export  const  innerJoin    =   async():Promise<TProductOrder[]>=>{
    try{
        const   result=await    executeQuery(`
            SELECT 
            p.product_id,
            p.name AS product_name,
            p.price,
            o.order_id,
            o.quantity_ordered,
            o.customer_name,
            o.order_date
        FROM products p
        INNER JOIN orders o ON p.product_id = o.product_id
            `);
            return  result.rows;
    }catch(error){
        console.error("Error performing inner join:", error);
        throw   error;
    }
}

export  const  leftJoin    =   async():Promise<TProductOrder[]>=>{
    try{
        const   result=await    executeQuery(`
            SELECT 
            p.product_id,
            p.name AS product_name,
            p.price,
            o.order_id,
            o.quantity_ordered,
            o.customer_name,
            o.order_date
        FROM products p
        LEFT JOIN orders o ON p.product_id = o.product_id;
            `);
            return  result.rows;
    }catch(error){
        console.error("Error performing inner join:", error);
        throw   error;
    }
}

export  const  rightJoin    =   async():Promise<TProductOrder[]>=>{
    try{
        const   result=await    executeQuery(`
            SELECT 
            p.product_id,
            p.name AS product_name,
            p.price,
            o.order_id,
            o.quantity_ordered,
            o.customer_name,
            o.order_date
        FROM products p
        RIGHT JOIN orders o ON p.product_id = o.product_id;
            `);
            return  result.rows;
    }catch(error){
        console.error("Error performing inner join:", error);
        throw   error;
    }
}





