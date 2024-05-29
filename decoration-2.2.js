$(document).ready(function(){

    const   dropdown  =   $(".dropdown");
            //
            dropdown.mouseenter(  function(){ toggleDropdown($(this)); }    );
            dropdown.mouseleave(  function(){ toggleDropdown($(this)); }    );

            function toggleDropdown(dropdown){
                
                const   dropdownStatus  =   dropdown.attr("data-status");
                const   dropdownMenu    =   dropdown.find(".dropdown-menu");
                        //
                        switch(dropdownStatus){
                            case "visible":
                                                dropdownMenu.removeClass("d-block");
                                                dropdownMenu.addClass("d-none");
                                                dropdown.attr("data-status","hidden");
                                                break;

                            case "hidden":
                                                dropdownMenu.removeClass("d-none");
                                                dropdownMenu.addClass("d-block");
                                                dropdown.attr("data-status","visible");
                                                break;
                        }
            }

            grecaptcha.ready(function() {
                const   websiteFormGoogleRecaptchaInput     =   $("input#website-form-google-recaptcha-input");
                        //
                        //
                        if(typeof(websiteFormGoogleRecaptchaInput.attr("data-site-key"))!="undefined"){
                            const   websiteGoogleRecaptchaKey           =   websiteFormGoogleRecaptchaInput.attr("data-site-key").trim();
                                    grecaptcha.execute(websiteGoogleRecaptchaKey, {action: 'submit'}).then(function(token) {
                                        
                                        // console.log(token);
                                        // Add token to each input for form submition
                                        websiteFormGoogleRecaptchaInput.each(function(){
                                            $(this).val(token);
                                        });
                                    });
                        }
            });

            resizer();
            setInterval(resizer,100);

            //
            //
            function resizer(){

                const   screenHeightArea            =   $(".screen-height-area");  
                        screenHeightArea.each(function(){
                            var tmpHeight           =   $(window).height();
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   squareArea                  =   $(".square-area");   
                        squareArea.each(function(){
                            var tmpHeight           =   $(this).innerWidth();
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   goldenRatioArea             =   $(".golden-ratio-area");   
                        goldenRatioArea.each(function(){
                            //console.log($(this).width());
                            var tmpHeight           =   $(this).innerWidth()/1.618;
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   goldenRatioAreaPortrait     =   $(".golden-ratio-area-portrait");   
                        goldenRatioAreaPortrait.each(function(){
                            //console.log($(this).width());
                            var tmpHeight           =   ($(this).innerWidth()/1.618)*2;
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   halfWidthHeightArea             =   $(".half-width-height-area");   
                        halfWidthHeightArea.each(function(){
                            var tmpHeight           =   $(this).innerWidth()/2;
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   twoTimesWidthHeight         =   $(".two-times-width-height");   
                        twoTimesWidthHeight.each(function(){
                            var tmpHeight           =   $(this).innerWidth()*2;
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                const   squareAreaRelative          =   $(".square-area-relative");
                        squareAreaRelative.each(function(){
                            var tmpHeight           =   $(this).innerWidth();
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });
            }

    var productImagesPreviewAreaController      =   $("div.product-images-preview-area-controller");
        productImagesPreviewAreaController.click(function(){

            var controllerTask                          =   $(this).attr("data-controller-task");
            var controllerProductId                     =   $(this).attr("data-product-id");
            var controllerPreviewArea                   =   $("div.product-images-preview-area-"+controllerProductId);
            var controllerPreviewImages                 =   JSON.parse(controllerPreviewArea.attr("data-images"));
            var controllerPreviewImagesNum              =   controllerPreviewImages.length;
            var controllerPreviewLastImage              =   controllerPreviewImagesNum-1;
            var controllerPreviewLastDisplayedImage     =   controllerPreviewArea.attr("data-last-image")*1;
            var newImageToDisplay                       =   0;


                //
                if(controllerTask=="next"){
                    if(controllerPreviewLastDisplayedImage!=controllerPreviewLastImage){
                        newImageToDisplay   =   controllerPreviewLastDisplayedImage+1;
                    }
                    else{
                        newImageToDisplay   =   0;
                    }
                }
                else{
                    if(controllerPreviewLastDisplayedImage!=0){
                        newImageToDisplay   =   controllerPreviewLastDisplayedImage-1;
                    }
                    else{
                        newImageToDisplay   =   controllerPreviewLastImage;
                    }
                }

                controllerPreviewArea.attr("data-last-image",newImageToDisplay);
                //console.log(newImageToDisplay);
                //
                //
            var newImageToDisplayLink       =   "https://cms.safariandkairosafaris.co.tz/"+controllerPreviewImages[newImageToDisplay]
                controllerPreviewArea.css("background","url("+newImageToDisplayLink+")")
                controllerPreviewArea.css("background-size","cover")
                // console.log(newImageToDisplayLink);
        });

    var productImagesPreviewAreaThumbnail   =   $("div.product-images-preview-area-thumbnail");
        productImagesPreviewAreaThumbnail.click(function(){
            var productImagesPreviewAreaThumbnailPreviewAreaClass   =   "div."+$(this).attr("data-preview-area");
            var productImagesPreviewAreaThumbnailImageLink          =   $(this).attr("data-image");
            var productImagesPreviewAreaThumbnailImageId            =   $(this).attr("data-image-id");
            var productImagesPreviewAreaThumbnailPreviewArea        =   $(productImagesPreviewAreaThumbnailPreviewAreaClass);

                productImagesPreviewAreaThumbnailPreviewArea.attr("data-last-image",productImagesPreviewAreaThumbnailImageId);
                productImagesPreviewAreaThumbnailPreviewArea.css("background","url("+productImagesPreviewAreaThumbnailImageLink+")")
                productImagesPreviewAreaThumbnailPreviewArea.css("background-size","cover")

            

        });

    var productsDisplayModesArea    =   $("div.products-display-modes-area");
    var productsDisplayMode         =   "list";
    var productsDisplayModeSwitch   =   ".products-display-mode-switch";
        //
        if(localStorage.getItem("products-display-mode")!=null){
            //
            productsDisplayMode =   localStorage.getItem("products-display-mode");
        }
        else{
            //
            localStorage.setItem("products-display-mode","list")
        }

        //
        //
    var productsDisplayModes        =   '';
        switch(productsDisplayMode){
            case "list":
                            productsDisplayModes        =   '<i class="bi-menu-button-wide p-0 m-0 text-safari-orange  products-display-mode-switch cursor-pointer" data-display-mode="list" data-status="active"></i>'+
                                                            '<i class="bi-grid-fill p-0 m-0 ms-2 ps-3 products-display-mode-switch cursor-pointer" data-display-mode="grid" data-status="inactive"></i>';
                            break;

            case "grid":
                            productsDisplayModes        =   '<i class="bi-menu-button-wide p-0 m-0 products-display-mode-switch cursor-pointer" data-display-mode="list" data-status="inactive"></i>'+
                                                            '<i class="bi-grid-fill p-0 m-0 ms-2 ps-3 text-safari-orange products-display-mode-switch cursor-pointer" data-display-mode="grid" data-status="active"></i>';
                            break;
        }

        if(typeof(productsDisplayModesArea)!="undefined"){
            //
            //
            productsDisplayModesArea.html(productsDisplayModes);

        }

        //
        //
        $(document).on("click",productsDisplayModeSwitch,function(){

            var switcherStatus  =   $(this).attr("data-status");
            var switcherMode    =   $(this).attr("data-display-mode");
                if(switcherStatus!="active"){
                    //
                    localStorage.setItem("products-display-mode",switcherMode);
                    window.location.href    =   "/vehicles/display/"+switcherMode;
                }
                
        });
        //
   
        
    //
    // SITE SIDE FUNCTIONALITIES

    var sideSearchInput     =   $("input.side-area-search-input");
    var sideSearchButton    =   $("div.side-area-search-button");

        sideSearchButton.click(function(){
            performSearchByKeyword();
        });

        sideSearchInput.keyup(function(e){
            if(e.keyCode===13){
                //
                performSearchByKeyword();
            }
            
        })

        function performSearchByKeyword(){
            var searchKeyword           =   sideSearchInput.val();
            var searchKeywordLength     =   searchKeyword.length;
                //
                if(searchKeywordLength>0){
                    window.location.href    =   "/vehicles/keyword/"+encodeURIComponent(searchKeyword);
                }
                else{
                    sideSearchInput.focus();
                    sideSearchInput.attr("placeholder","Please enter keyword")
                }
        }

    var siteSideSelectOptionsArea   =   $("div.site-side-select-options-area");
        siteSideSelectOptionsArea.each(function(){

            var siteSideSelectOptionArea    =   $(this);
            var selectDataType              =   siteSideSelectOptionArea.attr("data-type");
            var selectDataPreValue          =   siteSideSelectOptionArea.attr("data-pre-option");
            var selectDataTitle             =   siteSideSelectOptionArea.attr("data-title");
            var selectDataHtml              =   '';

                switch(selectDataType){
                    case "car-maker":
                                        selectDataHtml      =   '';
                                        for(const c in carListJson){

                                            var carDetails      =   carListJson[c];
                                            var carMakerName    =   carDetails.brand;
                                                //
                                                if(selectDataPreValue!=carMakerName){
                                                    selectDataHtml     +=   '<option value="'+carMakerName+'">'+carMakerName+'</option>';    
                                                }   
                                        }
                                        //
                                        selectDataHtml  =   '<div class="row p-0 m-0 my-3 border-safari-orange rounded-1">'+
                                                                '<div class="col-6 p-2 py-2  m-0 bg-safari-orange text-center text-white fw-bold"> '+selectDataTitle+' </div>'+
                                                                '<div class="col-6 p-0 m-0 pe-1">'+
                                                                    '<select name="car-maker" class="col-12 p-2 py-2 shadow-none border-0 bg-transparent site-side-select site-side-select-'+selectDataType+'" data-type="'+selectDataType+'" data-pre-option="'+selectDataPreValue+'" data-title="'+selectDataTitle+'">'+
                                                                        '<option value="all">All</option>'+
                                                                        selectDataHtml+
                                                                    ' </select>'+
                                                                '</div>'+
                                                            '</div>';
                                        //
                                        siteSideSelectOptionArea.html(selectDataHtml); 
                                        break;
                    case "car-model":
                                        selectDataHtml  =   '<div class="row p-0 m-0 my-3 border-safari-orange rounded-1">'+
                                                                '<div class="col-12 p-2 py-2 text-secondary"> Please select maker first </div>'+
                                                            '</div>'
                                        //
                                        siteSideSelectOptionArea.html(selectDataHtml); 
                                        break;
                    case "car-year":
                                        var tmpSelectDataHtml   =   '';
                                        for(var y=2023;y>1990;y--){
                                            //
                                            tmpSelectDataHtml  +=   '<option value="'+y+'">'+y+'</option>';   
                                        }

                                        selectDataHtml  =   '<div class="col-12 p-0 m-0 mb-2 text-start fw-bold"> Year range</div>'+
                                                            '<div class="row p-0 m-0 my-3">'+
                                                                '<div class="col-5 p-0 m-0 ">'+
                                                                    '<select name="year-from" class="col-12 p-2 py-2 shadow-none border-1 border-safari-orange rounded-1 bg-transparent site-side-select site-side-select-'+selectDataType+'" data-type="'+selectDataType+'" data-pre-option="'+selectDataPreValue+'" data-title="'+selectDataTitle+'">'+
                                                                        '<option value="all">All</option>'+
                                                                        tmpSelectDataHtml+
                                                                    ' </select>'+
                                                                '</div>'+
                                                                '<div class="col-2 p-0 m-0 p-2 fw-bold">to</div>'+
                                                                '<div class="col-5 p-0 m-0">'+
                                                                    '<select name="year-to" class="col-12 p-2 py-2 shadow-none border-1 border-safari-orange rounded-1 bg-transparent site-side-select site-side-select-'+selectDataType+'" data-type="'+selectDataType+'" data-pre-option="'+selectDataPreValue+'" data-title="'+selectDataTitle+'">'+
                                                                        '<option value="all">All</option>'+
                                                                        tmpSelectDataHtml+
                                                                    ' </select>'+
                                                                '</div>'+
                                                            '</div>';
                                        //
                                        siteSideSelectOptionArea.html(selectDataHtml); 
                                        break;
                    case "car-gear":
                                        //
                                        selectDataHtml  =   '<div class="row p-0 m-0 my-3 border-safari-orange rounded-1">'+
                                                                '<div class="col-6 p-2 py-2  m-0 bg-safari-orange text-center text-white fw-bold"> '+selectDataTitle+' </div>'+
                                                                '<div class="col-6 p-0 m-0 pe-1">'+
                                                                    '<select name="car-gear" class="col-12 p-2 py-2 shadow-none border-0 bg-transparent site-side-select site-side-select-'+selectDataType+'" data-type="'+selectDataType+'" data-pre-option="'+selectDataPreValue+'" data-title="'+selectDataTitle+'">'+
                                                                        '<option value="all">All</option>'+
                                                                        '<option value="automatic"> Automatic</option>'+
                                                                        '<option value="manual">    Mannual</option>'+
                                                                    ' </select>'+
                                                                '</div>'+
                                                            '</div>';
                                        //
                                        siteSideSelectOptionArea.html(selectDataHtml); 
                                        break;
                    case "car-color":
                                        break;
                    case "car-fuel":    
                                        //
                                        selectDataHtml  =   '<div class="row p-0 m-0 my-3 border-safari-orange rounded-1">'+
                                                                '<div class="col-6 p-2 py-2  m-0 bg-safari-orange text-center text-white fw-bold"> '+selectDataTitle+' </div>'+
                                                                '<div class="col-6 p-0 m-0 pe-1">'+
                                                                    '<select name="car-fuel" class="col-12 p-2 py-2 shadow-none border-0 bg-transparent site-side-select site-side-select-'+selectDataType+'" data-type="'+selectDataType+'" data-pre-option="'+selectDataPreValue+'" data-title="'+selectDataTitle+'">'+
                                                                        '<option value="all">All</option>'+
                                                                        '<option value="petrol">Petrol</option>'+
                                                                        '<option value="diesel">Diesel</option>'+
                                                                        '<option value="hybrid">Hybrid</option>'+
                                                                    ' </select>'+
                                                                '</div>'+
                                                            '</div>';
                                        //
                                        siteSideSelectOptionArea.html(selectDataHtml); 
                                        break;
                }
        });

    var siteSideSelect  =   "select.site-side-select";
        $(document).on("click",siteSideSelect,function(){
            var tmpSiteSideSelect       =   $(this);
            var tmpSelectDataType       =   tmpSiteSideSelect.attr("data-type");
            var tmpSelectDataPreValue   =   tmpSiteSideSelect.attr("data-pre-option");
            var tmpSelectDataTitle      =   tmpSiteSideSelect.attr("data-title");
            var tmpSelectDataValue      =   tmpSiteSideSelect.val();
            var changesHtmlArea         =   $(this);   

                //
                //
                switch(tmpSelectDataType){

                    case "car-maker":
                                            
                                        var tmpCarMakerDetails  =   carListJson.find(car=>car.brand==tmpSelectDataValue);
                                        var tmpCarMakerModels   =   tmpCarMakerDetails.models;
                                        var tmpCarModelsOptins  =   '';
                                            for(const m in tmpCarMakerModels){
                                                var carModel                =   tmpCarMakerModels[m];
                                                    tmpCarModelsOptins     +=   '<option value="'+carModel+'">'+carModel+'</option>';
                                                    
                                            }

                                            tmpCarModelsOptins  =   '<div class="row p-0 m-0 my-3 border-safari-orange rounded-1">'+
                                                                        '<div class="col-6 p-2 py-2  m-0 bg-safari-orange text-center text-white fw-bold"> Models </div>'+
                                                                        '<div class="col-6 p-0 m-0 pe-1">'+
                                                                            '<select name="car-model" class="col-12 p-2 py-2 shadow-none border-0 bg-transparent site-side-select site-side-select-'+tmpSelectDataType+'" data-type="'+tmpSelectDataType+'" data-pre-option="'+tmpSelectDataPreValue+'" data-title="'+tmpSelectDataTitle+'">'+
                                                                                '<option value="all">All</option>'+
                                                                                tmpCarModelsOptins+
                                                                            ' </select>'+
                                                                        '</div>'+
                                                                    '</div>';

                                            changesHtmlArea     =   $("div.site-side-select-options-area-car-model");
                                            changesHtmlArea.html(tmpCarModelsOptins);
                                        // tmpSelectDataValue
                                        //
                                        break;


                }
        });

    var     rawPostContentArea  =   $("div.website-post-content-raw");
    var     postContentArea     =   $("div.website-post-content-html");
            //
            if(typeof(rawPostContentArea)!="undefined"){
                postContentArea.html(rawPostContentArea.text());
            }
            
    

    const   mobileMenuIcon      =   $(".mobile-menu-toggler");
    const   mobileMenuArea      =   $(".mobile-menu");
    const   mobileMenuLink      =   $(".mobile-menu-link");

            mobileMenuIcon.click(   function(){     toggleMobileMenu();    });
            mobileMenuLink.click(   function(){     toggleMobileMenu();    });

            function toggleMobileMenu(){

                var menuStatus                =   mobileMenuIcon.attr("data-status");
                var menuSlideDirectionOpen    =   mobileMenuIcon.attr("data-slide-direction-open");
                var menuSlideDirectionClose   =   mobileMenuIcon.attr("data-slide-direction-close");
                var menuIcon                  =   mobileMenuIcon.attr("data-icon");
                var menuCloseIcon             =   mobileMenuIcon.attr("data-icon-close");
              
                    // console.log(menuStatus);
                    //
                    switch(menuStatus){
                        case "hidden":
                                            mobileMenuArea.removeClass("d-none").show("slide",{direction:menuSlideDirectionOpen},200);
                                            mobileMenuIcon.attr("data-status","visible");
                                            mobileMenuIcon.removeClass(menuIcon).addClass(menuCloseIcon);
                                            break;

                        case "visible":
                                            mobileMenuArea.addClass("d-none").hide("slide",{direction:menuSlideDirectionClose},200);
                                            mobileMenuIcon.attr("data-status","hidden");
                                            mobileMenuIcon.removeClass(menuCloseIcon).addClass(menuIcon);
                                            break;
                    }
            }

    const   mobileMenuSubmenu           =   $(".mobile-menu-submenu");

    const   mobileMenuSubmenuAreas      =   $(".mobile-menu-submenu-area");
    const   mobileMenuSubmenuIcons      =   $(".mobile-menu-submenu-icon");
            //
            mobileMenuSubmenu.click(function(){
                var submenuArea         =   $(this).find(".mobile-menu-submenu-area");
                var submenuIcon         =   $(this).find(".mobile-menu-submenu-icon");
                    //
                    switch($(this).attr("data-status")){
                        case "hidden":
                                            collapseSubmenus();
                                            //
                                            submenuIcon.removeClass('bi-arrow-right-short').addClass('bi-arrow-down-short');
                                            submenuArea.removeClass('d-none').addClass('d-block').show("slide",{direction:'down'},150);
                                            $(this).attr("data-status","visible");
                                            break;
                        case "visible":
                                            collapseSubmenus();
                                            break;
                    }
            });

            function collapseSubmenus(){
                mobileMenuSubmenu.each(function(){      $(this).attr("data-status","hidden");    });
                //
                mobileMenuSubmenuAreas.each(function(){ $(this).removeClass('d-block').addClass('d-none').hide("slide",{direction:'down'},150);    });
                mobileMenuSubmenuIcons.each(function(){ $(this).removeClass('bi-arrow-down-short').addClass('bi-arrow-right-short');    });
            }

        
});
