import db, { executeQuery } from "../config/database";



export  const  union =   async():Promise<string[]>=>{
    try{
    const   result=await  executeQuery(`
            SELECT products.name FROM products
            UNION
            SELECT orders.customer_name FROM orders;
        
    `);
    return  result.rows;
}catch(error){
    console.log(error);
    throw   error
}
}

export  const   unionAll =   async():Promise<string[]>=>{
    try{
    const   result=await  executeQuery(`
            SELECT products.name FROM products
            UNION  ALL
            SELECT orders.customer_name FROM orders;
    `);
    return  result.rows;
}catch(error){
    console.log(error);
    throw   error
}
}

export  const  intersect =   async():Promise<string[]>=>{
    try{
    const   result=await  executeQuery(`
            SELECT products.name FROM products
            INTERSECT
            SELECT orders.customer_name FROM orders;
    `);
    return  result.rows;
}catch(error){
    console.log(error);
    throw   error
}
}

export  const  except =   async():Promise<string[]>=>{
    try{
    const   result=await  executeQuery(`
            SELECT products.name FROM products
            EXCEPT
            SELECT orders.customer_name FROM orders;
    `);
    return  result.rows;
}catch(error){
    console.log(error);
    throw   error
}
}