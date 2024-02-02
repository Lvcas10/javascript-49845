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

const listCart = JSON.parse( localStorage.getItem('cart') ) || [];
const cart = new Cart(listCart);

cartCount.innerText = cart.getCount();

btnModalCarrito.addEventListener('click', function(){
    const list = cart.getProducts();
    redenCart(list);
    cartSum.innerText = cart.getSum();
    modal.show();
})

btnClose.addEventListener('click', () => {
    modal.hide();
})

btnOrder.addEventListener('click', ()=> {
    products.sort(  (a, b ) => {
        if(  a.price < b.price  ){
            return -1
        }
        if ( a.price > b.price){
            return 1
        }

        return 0
    } )

    renderProducts(products);
})

btnOrderUp.addEventListener('click', ()=> {
    products.sort(  (a, b ) => {
        if ( a.price > b.price){
            return -1
        }
        if(  a.price < b.price  ){
            return 1
        }

        return 0
    } )

    renderProducts(products);
})

selectCategory.addEventListener('click', (event) => {
    const search = selectCategory.value
    const newList = products.filter(  (product) => product.category.toLowerCase().includes( search.toLowerCase() ) );
    renderProducts(newList);
})

inputSearch.addEventListener('input', (event) => {
    const search = inputSearch.value
    const newList = products.filter(  (product) => product.name.toLowerCase().includes( search.toLowerCase() ) );
    renderProducts(newList);
})

const renderProducts = (list) => {
    listProducts.innerHTML = '';
    list.forEach(product => {
        listProducts.innerHTML +=
            `<div class="col-sm-4 col-md-3">
                <div class="card p-2">
                    <h4 class="text-center">${product.name} </h4>
                    <img class="img-fluid" src="${product.img}" alt="${product.name}">
                    <p class="text-center">${product.category}
                    <h3 class="text-center">$${product.price} </h3>
                    <button id="${product.id} " type="button" class="btn btn-primary btnAddCart">
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

const addToCart = (evento) => {
    const id = evento.target.id;
    const product = products.find (item => item.id == id );
    console.log(product);
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();
}

const redenCart = (list) => {
    modalListProducts.innerHTML = '';
    list.forEach( product => {
        modalListProducts.innerHTML += // html
            `<tr>
                <td> ${product.name} </td>
                <td> ${product.units}</td>
                <td>$${product.price}</td>
                <td>$${product.price * product.units}</td>
            </tr>`
    });
}

renderProducts( products);
