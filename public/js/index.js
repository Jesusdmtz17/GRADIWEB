Array.prototype.equals&&console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."),Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0,t=this.length;r<t;r++)if(this[r]instanceof Array&&e[r]instanceof Array){if(!this[r].equals(e[r]))return!1}else if(this[r]!=e[r])return!1;return!0},Object.defineProperty(Array.prototype,"equals",{enumerable:!1});

window.GradiWebApp = window.GradiWebApp || {
    selectors: {
        product_name: '.product-title',
        product_vendor: '.product-vendor',
        product_price: '.product-price',
        product_variants: '.product-variants',
        product_variants_option_wrapper: '.option-wrapper',
        product_variants_option_selector: '.option-selector',
        product_qty_selector: '.product-actions .qty-selector input',
        product_qty_buttons: '.product-actions .qty-selector button',
        total_price: '.product-actions .total-price .total',
        form_buttons: '.product-actions .actions button',
        product_description: '.product-description',
        product_main_images: '.main-images-slider',
        product_thumbsnail_images: '.thumbnails-images-carousel',
        popup_container_product: '.popup-notification .product-content',
        popup_close: '.popup-notification .close-popup'
    },
    initialData_GradiWebApp: function(){
        //function for get data from json file
        let _this = this;
        (async ()=>{ 
            let response = await fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js');
            let response_json = await response.json();
            window.GradiWebApp.product_variants = response_json.variants;
            
            document.querySelector(_this.selectors.product_name).innerHTML = response_json.title;
            document.querySelector(_this.selectors.product_vendor).innerHTML = response_json.vendor;
            document.querySelector(_this.selectors.product_description).innerHTML = response_json.description;
            _this.writeOptions(response_json);
            document.querySelector(_this.selectors.product_price).innerHTML = _this.calcPrice(response_json.variants[0]);
            document.querySelector(_this.selectors.total_price).innerHTML = _this.totalPrice(document.querySelector(_this.selectors.product_qty_selector).value,response_json.variants[0]);
            _this.initializeImages(response_json.images);
            _this.setEventsListeners();
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
                    <input id="${element.name}-${option}" data-option-position="option${element.position}" name="option-${element.name}" value="${option}" type="radio" class="${this.selectors.product_variants_option_selector.replace('.','')}" ${index == 0 ? 'checked': ''}>
                    <label for="${element.name}-${option}" class="${this.selectors.product_variants_option_selector.replace('.','')}-label ${option.toLowerCase()}" data-value="${option}">${option}</label>
                </div>`;
                
                if(index == (element.values.length - 1)){
                    options += `</div> </div>`;
                }
            })
        });
        document.querySelector(this.selectors.product_variants).innerHTML = options;
    },
    getSelectedVariant: function(){
        let return_variant = false,
        options = [];
        document.querySelectorAll(this.selectors.product_variants_option_wrapper).forEach(element=>{
            options.push(element.querySelector('input:checked').value);
        })
        if(this.hasOwnProperty('product_variants')){
            this.product_variants.forEach(variant=>{
                if (variant.options.equals(options)){
                    return_variant = variant;
                }
            })
        }
        return return_variant;
    },
    setEventsListeners: function(){
        document.querySelectorAll(this.selectors.product_qty_buttons).forEach(element=>{
            element.addEventListener('click', event=>{
                qty = parseFloat(document.querySelector(this.selectors.product_qty_selector).value);
                if(event.target.classList.contains('minus-qty')){
                    qty -= 1;
                    if(qty<1){
                        qty = 1;
                    }
                }else {
                    qty += 1;
                }
                document.querySelector(this.selectors.product_qty_selector).value = qty;
                let variant = this.getSelectedVariant();
                document.querySelector(this.selectors.total_price).innerHTML = this.totalPrice(qty, variant);

            })
        })
        document.querySelectorAll(this.selectors.form_buttons).forEach(element => {
            element.addEventListener('click', event=>{
                let variant = this.getSelectedVariant();
                let content = `<div class="product-selected">
                        <h2>Product Added to ${event.target.classList.contains('add-to-cart')? 'the Cart': 'Favourite'}</h2>
                        <div class="product-information">
                            <img src="${document.querySelector('.image-product.thumbnail').getAttribute('src')}" srcset="${document.querySelector('.image-product.thumbnail').getAttribute('srcset')}">
                            <h3>${variant.name} ${event.target.classList.contains('add-to-cart') ? `x (${document.querySelector(this.selectors.product_qty_selector).value})`:``}</h3>
                        </div>
                        <button class="close-popup">Close</button>
                    </div>`;
                document.querySelector(this.selectors.popup_container_product).innerHTML = content;
                document.querySelector(this.selectors.popup_container_product + ' .close-popup').addEventListener('click', event=>{
                    event.target.closest('.popup-notification').classList.remove('active');
                    event.target.closest('.popup-notification').querySelector('.product-content').innerHTML = '';
                })
                document.querySelector('.popup-notification').classList.add('active');
            })
        });
        document.querySelectorAll(this.selectors.popup_close).forEach(element => {
            element.addEventListener('click', event=>{
                event.target.closest('.popup-notification').classList.remove('active');
                event.target.closest('.popup-notification').querySelector('.product-content').innerHTML = '';
            })
        })
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
                <img class="image-product main" src="https:${image}">
            </div>`;
            thumbnails += `<div class="container-image">
                <img class="image-product thumbnail" src="https:${image.replace('.jpg','_150x.jpg')}" srcset="https:${image.replace('.jpg','_150x.jpg')} 1x, https:${image.replace('.jpg','_300x.jpg')} 2x">
            </div>`;
        })
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