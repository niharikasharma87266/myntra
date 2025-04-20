// import http from 'http';
// import mysql from 'mysql2';
// import { parse } from 'url';
// import { promises as fs } from 'fs';

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',  // Your MySQL password
//   database: 'ecommerce1'  // Your database name
// });

// // Create an HTTP server
// http.createServer(async (req, res) => {
//   // Set response headers
//   res.setHeader('Content-Type', 'application/json');

//   if (req.method === 'POST' && parse(req.url).pathname === '/add-to-cart') {
//     let data = '';
    
//     // Collect data from the request body
//     req.on('data', chunk => {
//       data += chunk;
//     });

//     req.on('end', () => {
//       const { product_id, product_name, product_price } = JSON.parse(data);

//       console.log(product_id, product_name, product_price);
//       // Insert the product data into the cart table
//       const sql = 'INSERT INTO cart (product_id, product_name, product_price) VALUES (${product_id}, ${product_name},${product_price})';
//       connection.execute(sql, [product_id, product_name, product_price], (err, results) => {
//         if (err) {
//           res.statusCode = 500;
//           res.end(JSON.stringify({ message: 'Failed to add product to cart', error: err.message }));
//         } else {
//           res.statusCode = 200;
//           res.end(JSON.stringify({ message: 'Product added to cart successfully!' }));
//         }
//       });
//     });

//   } else {
//     res.statusCode = 404;
//     res.end(JSON.stringify({ message: 'Not Found' }));
//   }
// }).listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
import http from 'http';
import mysql from 'mysql2';
import { promises as fs } from 'fs';

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Your MySQL password
  database: 'ecommerce1'  // Your database name
});

// Create an HTTP server
http.createServer(async (req, res) => {
  // Set response headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST' && req.url === '/add-to-cart') {
    let data = '';
    
    // Collect data from the request body
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const { product_id, product_name, product_price } = JSON.parse(data);
        console.log(product_id, product_name, product_price)
        // Prepare the SQL query with placeholders to prevent SQL injection
        const sql = 'INSERT INTO cart (product_id, product_name, product_price) VALUES (?, ?, ?)';
        
        // Execute the SQL query
        connection.execute(sql, [product_id, product_name, product_price], (err, results) => {
          if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Failed to add product to cart', error: err.message }));
          } else {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Product added to cart successfully!' }));
          }
        });
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid JSON data', error: err.message }));
      }
    });

  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
