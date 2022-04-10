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
        product_main_images: '.main-images-slider',
        product_thumbsnail_images: '.thumbnails-images-carousel'
    },
    initialData_GradiWebApp: function(){
        //function for get data from json file
        let _this = this;
        (async ()=>{ 
            let response = await fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js');
            let response_json = await response.json();
            window.product_variants = response_json.variants;
            
            document.querySelector(_this.selectors.product_name).innerHTML = response_json.title;
            document.querySelector(_this.selectors.product_vendor).innerHTML = response_json.vendor;
            document.querySelector(_this.selectors.product_description).innerHTML = response_json.description;
            _this.writeOptions(response_json);
            document.querySelector(_this.selectors.product_price).innerHTML = _this.calcPrice(response_json.variants[0]);
            document.querySelector(_this.selectors.total_price).innerHTML = _this.totalPrice(document.querySelector(_this.selectors.product_qty_selector).value,response_json.variants[0]);
            _this.initializeImages(response_json.images);
        })();
    },
    writeOptions: function(product){
        let options = ``;
        product.options.forEach(element => {
            element.values.forEach((option, index)=>{
                if(index == 0){
                    options += `<div class="option-wrapper">
                    <label>${element.name}</label>
                    <div class="option-wrapper-values">`;
                }
                options += `<div class="option-${element.name}">
                    <input name="option-${element.name}" value="${option}" type="radio" class="option-selector" ${index == 0 ? 'checked': ''}>
                    <label class="option-selector-label">${option}</label>
                </div>`;
                
                if(index == (element.values.length - 1)){
                    options += `</div>`;
                }
            })
        });
        document.querySelector(this.selectors.product_variants).innerHTML = options;
    },
    calcPrice: function(variant){
        let price = `<span class="normal-price">${this.formatMoney(variant.price)}</span> ${ variant.compare_at_price > variant.price ? `<span class="compare-at-price">${this.formatMoney(variant.compare_at_price)}</span>`:``}`;
        return price;
    },
    totalPrice: function(qty, variant){
        total = `${ this.formatMoney(qty*variant.price) }`;
        return total;
    },
    formatMoney: function(price){
        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        
        return formatter.format(price/100);
    },
    initializeImages: function(images){
        let mainImages = ``, thumbnails = ``;

        images.forEach(image =>{
            mainImages += `<div class="container-image">
                <img class="image-product main" src="${image}">
            </div>`;
            thumbnails += `<div class="container-image">
                <img class="image-product thumbnail" src="${image.replace('.jpg','_150x.jpg')}" srcset="${image.replace('.jpg','_150x.jpg')} 1x, ${image.replace('.jpg','_300x.jpg')} 2x">
            </div>`;
        })
        console.log(this.selectors.product_main_images)
        if(mainImages !== null && thumbnails !== null){
            let mainImagesWrapper = document.querySelector(this.selectors.product_main_images);
            mainImagesWrapper.innerHTML = mainImages;

            //initialize slider for main carrusel
            var flkty = new Flickity( mainImagesWrapper, {
                // options
                imagesLoaded: true,
                lazyLoad: true,
                prevNextButtons: false,
                resize: true
              });
            let thumbnailImagesWrapper = document.querySelector(this.selectors.product_thumbsnail_images);
            thumbnailImagesWrapper.innerHTML = thumbnails;
            
            //initialize slider for thumbnails carrusel
            var flkty2 = new Flickity( thumbnailImagesWrapper, {
                asNavFor: document.querySelector(this.selectors.product_main_images),
                pageDots: false,
                imagesLoaded: true,
                lazyLoad: true,
                contain: true,
                prevNextButtons: false,
                resize: true
            });
        }
    },
    init: function(){
        //master function
        this.initialData_GradiWebApp(); 
    }
};

GradiWebApp.init();