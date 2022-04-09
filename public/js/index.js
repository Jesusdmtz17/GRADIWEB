window.GradiWebApp = window.GradiWebApp || {
    selectors: {
        product_name: '.product-title',
        product_vendor: '.product-vendor',
        product_price: '.product-price',
        product_variants: '.product-variants',
        product_qty_selector: '.product-actions .qty-selector input',
        product_qty_buttons: '.product-actions .qty-selector button',
        total_price: '.product-actions .total-price .total',
        add_to_wishlist: '.product-actions .actions .add-to-wishlist',
        add_to_cart: '.product-actions .actions .add-to-cart',
        product_description: '.product-description',
        product_featured_images: '.featured-images-slider',
        product_thumbsnail_images: '.thumbnails-images-carousel'
    },
    initialData_GradiWebApp: function(){
        //function for get data from json file
        let _this = this;
        (async ()=>{ 
            let response = await fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js');
            let response_json = await response.json();
            console.log(response_json);

            document.querySelector(_this.selectors.product_name).innerHTML = response_json.title;
            document.querySelector(_this.selectors.product_vendor).innerHTML = response_json.vendor;
            document.querySelector(_this.selectors.product_description).innerHTML = response_json.description;
            
        })();
    },
    init: function(){
        //master function
        this.initialData_GradiWebApp(); 
        
    }
};

GradiWebApp.init();