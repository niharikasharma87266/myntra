// const header = document.querySelector("header");

// window.addEventListener ("scroll",function(){
//     header.classList.toggle("sticky", this.window.scrollY > 0);
// })

// function addToCart(productName, productPrice) {
//     // Create a request to the server
//     const data = {
//         productName: productName,
//         productPrice: productPrice,
//         quantity: 1 // For simplicity, set quantity to 1. You can modify this to make it dynamic.
//     };

//     fetch('http://localhost:3000/add-to-cart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message);  // Show success message
//     })
//     .catch(error => {
//         alert('Error: ' + error);
//     });
// }