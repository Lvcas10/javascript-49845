const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const cartSum = document.querySelector('#cartSum');
const inputSearch = document.querySelector('#inputSearch');
const listProducts = document.querySelector('#listProducts');
const selectCategory = document.querySelector('#selectCategory');
const modalListProducts = document.querySelector('#modalListProducts');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnOrder = document.querySelector('#btnOrder');
const btnOrderUp = document.querySelector('#btnOrderUp');
let products_list = []; 
const listCart = JSON.parse( localStorage.getItem('cart') ) || [];
const cart = new Cart(listCart);
document.getElementById('clearCartButton').addEventListener('click', clearCart);

function clearCart() {
    localStorage.removeItem('cart');
    /* cart = new Cart();
    cartCount.innerText = 0;
    cartSum.innerText = 0;  */
    redenCart(cart.getProducts()); 
}

cartCount.innerText = cart.getCount();

btnModalCarrito.addEventListener('click', function(){
    const list = cart.getProducts();
    redenCart(list);
    cartSum.innerText = cart.getSum();
    modal.show();
})

btnSave.addEventListener("click", () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu compra fue realizada correctamente",
        showConfirmButton: false,
        timer: 2000
    });
    modal.hide();
    localStorage.removeItem("cart");
})

btnClose.addEventListener('click', () => {
    modal.hide();
})

btnOrder.addEventListener('click', ()=> {
    products_list.sort(  (a, b ) => {
        if(  a.price < b.price  ){
            return -1
        }
        if ( a.price > b.price){
            return 1
        }

        return 0
    } )

    renderProducts(products_list);
})

const filtroCategoria = (id_category) => {
    if (id_category === null) { // Si no se proporciona una categoría, mostrar todos los productos
        renderProducts(products_list);
    } else {
        const newList = products_list.filter((product) => product.id_category == id_category);
        renderProducts(newList);
    }
}

btnOrderUp.addEventListener('click', ()=> {
    products_list.sort(  (a, b ) => {
        if ( a.price > b.price){
            return -1
        }
        if(  a.price < b.price  ){
            return 1
        }

        return 0
    } )

    renderProducts(products_list);
})

selectCategory.addEventListener('change', (e) => {
    const id_category = selectCategory.value;
    if (id_category === "4") {
        filtroCategoria(null);
        inputSearch.disabled = false;
    } else {
        filtroCategoria(id_category);
        inputSearch.disabled = true;
    }
});

inputSearch.addEventListener('input', (event) => {
    const search = inputSearch.value
    const newList = products_list.filter(  (product) => product.name.toLowerCase().includes( search.toLowerCase() ) );
    renderProducts(newList);
})

const addToCart = (evento) => {
    const id = evento.target.id;
    const product = products_list.find (item => item.id_product == id );
    console.log(product);
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();

    Toastify({
        text: "Producto Agregado",
        gravity: "bottom",
        position: 'left',
        close: true,
        style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();
}

const renderProducts = (list) => {
    listProducts.innerHTML = '';
    list.forEach(product => {
        listProducts.innerHTML +=
            `<div class="col-sm-4 col-md-3">
                <div class="card p-2">
                    <h4 class="text-center">${product.name} </h4>
                    <img class="img-fluid" src="${product.img}" alt="${product.name}">
                    <h3 class="text-center">$${product.price} </h3>
                    <button id="${product.id_product} " type="button" class="btn btn-primary btnAddCart">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>`;
    });


    const btns = document.querySelectorAll(".btnAddCart")
    btns.forEach (btn => {
        btn.addEventListener("click", addToCart);
    })
}

const redenCart = (list) => {
    modalListProducts.innerHTML = '';
    list.forEach( product => {
        const removeProduct = () => {
            console.log ('hola')
            cart.removeProduct (product.id_product)
        }
        modalListProducts.innerHTML += // html
            `<tr>
                <td>${product.name}</td>
                <td>${product.units}</td>
                <td>$${product.price}</td>
                <td>$${product.price * product.units}</td>
                <td><button onclick="${removeProduct}">X</button></td>
            </tr>`
    });
}

const renderCategory = (list) => {
    selectCategory.innerHTML = "";
list.forEach(category => {
        selectCategory.innerHTML += 
        `<option value="${category.id_category}">${category.name}</option>`
    });
}

const getProducts = async () => {

    try {
        const endPoint = "data.json";
        const resp = await fetch(endPoint);
        const json = await resp.json();
        const {products, category} = json;
        products_list = products;

        renderProducts (products); 
        renderCategory (category);
    } catch (error) {
        
    }
}

getProducts();