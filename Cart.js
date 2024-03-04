class Cart {
    constructor (list = []){
        this.cart = list;
    }

    addToCart( {id_product, name, img, price, category} ){
        const index = this.cart.findIndex(  product => product.id == id_product );
        if( index == -1){
            this.cart.push( {id_product, name, price, units: 1} );
        } else {
            this.cart[index].units += 1;
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    

    removeProduct (id_product) {
        this.cart = list.cart.filter((item) => item.id_product !== id_product)
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    getProducts (){
        return this.cart;
    }

    getCount(){
        const count = this.cart.reduce(  (cant, product) => {  return cant + product.units   }, 0  )
        return count;
    }

    getSum(){
        return this.cart.reduce(  (acum, product) => {  return acum + (product.units * product.price)  }, 0  )
    }
}