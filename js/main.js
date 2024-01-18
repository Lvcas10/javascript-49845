const list = [
    { id: 1, product: "Teclado Redragon Kumara K552",    category: "Teclado Mecanico",  price: 56000},
    { id: 2, product: "Teclado HyperX Alloy Origins",    category: "Teclado Mecanico",  price: 90000},
    { id: 3, product: "Mouse Logitech G502",             category: "Gamer",             price: 65000},
    { id: 4, product: "Auriculares HyperX Cloud Flight", category: "Gamer",             price: 110000},
    { id: 5, product: "Auriculares Logitech G733",       category: "Gamer",             price: 220000},
    { id: 6, product: "Auriculares G Pro",               category: "Gamer",             price: 190000},
]

class TopProducts {
    constructor (list){
        this.list = list;
    }

    addProduct(product) {
        if (product.product && product.category && product.price && typeof product.price === 'number') {
            const id = this.list.length + 1;
            product.id = id;
            this.list.push(product);
        } else {
            console.log("Error: Producto no válido");
        }
    }

    getProductById(id){
        const product = this.list.find (item => item.id === id);
        return product ? product : "No Se Encuentra el Producto"
    }

    getProductByCategory(category){
        const list = this.list.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
        return list;
    }

    getProductByName(product){
        const list = this.list.filter(item => item.product.toLowerCase().includes(product.toLowerCase()));
        return list;
    }

    showProduct(){
        console.table(this.list)
    }
}

const pdt = new TopProducts(list);

let producto = prompt("Producto"); 
let category;
let price;

do {
    category = prompt("Categoria");
    price = parseInt(prompt("Precio"));
        if (isNaN(price)) {
        console.log("Error: Precio no válido");
        continue;
    }
    pdt.addProduct({ product: producto, category: category, price: price });
    pdt.showProduct();
    producto = prompt("Producto");

} 
while (producto.toLowerCase() != "salir")




