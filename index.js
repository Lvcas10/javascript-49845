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

    list.forEach((product, index) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdUnits = document.createElement('td');
        const tdPrice = document.createElement('td');
        const tdTotal = document.createElement('td');
        const tdButton = document.createElement('td');
        const button = document.createElement('button');

        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>`;
        button.classList.add('btn', 'btn-sm', 'btn-danger', 'text-white')

        button.addEventListener('click', () => {
            cart.removeProduct(index);
            redenCart(cart.getProducts());
        });

        tdButton.appendChild(button);

        tdName.innerText = product.name;
        tdUnits.innerText = product.units;
        tdPrice.innerText = `$${product.price}`;
        tdTotal.innerText = `$${product.price * product.units}`;

        tr.appendChild(tdName);
        tr.appendChild(tdUnits);
        tr.appendChild(tdPrice);
        tr.appendChild(tdTotal);
        tr.appendChild(tdButton);
        
        modalListProducts.appendChild(tr);
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