$(document).ready(function(){
    //
    const   windowWidth                     =   $(window).width();
    var     websitePopupOverlay             =   $("div.popup-overlay");
    var     popupBookingForm                =   $("div.booking-popup-form-area");
    var     galleryImagesPreviewArea        =   $(".gallery-images-preview-area");
    var     websitePopupOverlayClose        =   $(".popup-overlay-close");


    //
    // gallery image view
    var     galleryImageCard                =   $(".gallery-image-card");
    var     galleryImagesPreviewAreaClose   =   $(".gallery-images-preview-area-close");
    var     galleryImagePreviewArea         =   $(".gallery-image-preview-area");
    var     galleryImagesThumbnailsArea     =   $(".gallery-images-thumbnails-area");
    var     galleryImageThumbnail           =   ".gallery-image-thumbnail"

            function togglePopupOverlay(action,relatedOverlay){
                //
                switch(action){
                    case "show":
                                    relatedOverlay.removeClass("d-none");
                                    relatedOverlay.addClass("d-block d-flex");
                                    break;
                    case "hide":
                                    websitePopupOverlay.removeClass("d-block d-flex");
                                    websitePopupOverlay.addClass("d-none");
                                    //
                                    // destroy previous items
                                    galleryImagesThumbnailsArea.html('');
                                    break;
                }
            }

            websitePopupOverlayClose.click(function(){
                togglePopupOverlay("hide",websitePopupOverlay);
            });

            galleryImageCard.click(function(){
                //
                
                var allGalleryImagesLinks           =   [];
                var allGalleryImagesThumbnails      =   '';
                var clickedGalleryImageCardLink     =   $(this).attr("data-gallery-image").trim();

                    galleryImagesPreviewArea.attr("data-visibility-status","visible");
                    galleryImagePreviewArea.css("background","url("+clickedGalleryImageCardLink+")");

                    //
                    // get links of all gallery images
                    galleryImageCard.each(function(){
                        var galleryImageLink    =   $(this).attr("data-gallery-image").trim();
                            if($(this).attr("data-gallery-image")!=clickedGalleryImageCardLink){    
                                allGalleryImagesLinks.push(galleryImageLink);
                                //
                                if(windowWidth>580){
                                    allGalleryImagesThumbnails  +=  '<div class="col-4 p-0 ps-3 pb-3 m-0">'+
                                                                        '<div class="col-12 p-0 m-0 square-area lazy bg-cover gallery-image-thumbnail" data-bg="'+galleryImageLink+'" style="background:url('+galleryImageLink+');"></div>'+
                                                                    '</div>';
                                }
                                else{
                                    var carouselItemClass   =   "item";
                                        if(allGalleryImagesLinks.length==0){ carouselItemClass   =   "item active"; }
                                        //
                                        allGalleryImagesThumbnails  +=  '<div class="col-12 p-0 m-0 pe-3 '+carouselItemClass+' d-inline-block">'+
                                                                            '<div class="col-12 p-0 m-0 square-area lazy bg-cover gallery-image-thumbnail" data-bg="'+galleryImageLink+'" style="background:url('+galleryImageLink+');"></div>'+
                                                                        '</div>';
                                }
                            }

                            //
                            // on desktop show only eight items the exit each
                            if((windowWidth>580)&&(allGalleryImagesLinks.length==18)){
                                //
                                return false;
                            }
                    });

                    //
                    //if mobile prepare a carousel
                    if(windowWidth<=580){

                        allGalleryImagesThumbnails  =   '<div class="col-12 p-0 m-0 owl-carousel carousel-gallery-area">'+allGalleryImagesThumbnails+'</div>';
                        //
                        // add items to thumbnails area with modifications
                        galleryImagesThumbnailsArea.html(allGalleryImagesThumbnails);
                        togglePopupOverlay("show",galleryImagesPreviewArea);
                        //
                        //
                        $(".carousel-gallery-area").owlCarousel(
                            {
                                autoplay		:	false,
                                autoHeight		:	false,
                                center			:	true,
                                loop			:	true,
                                items			:	3.5,
                                margin			:	0,
                                stagePadding	: 	0,
                                nav				: 	false,
                                dots			: 	false,
                            }
                        );
                    }
                    else{
                        // add items to thumbnails area without modifications
                        galleryImagesThumbnailsArea.html(allGalleryImagesThumbnails);
                        togglePopupOverlay("show",galleryImagesPreviewArea);
                    }
                    
                    //console.log(galleryImageCardLink);
            });

            //
            // gallery image thumbnail clicked
            $(document).on("click",galleryImageThumbnail,function(){
                var     clickedThumbnailImageLink   =   $(this).attr("data-bg");
                        galleryImagePreviewArea.css("background","url("+clickedThumbnailImageLink+")");
            });
});