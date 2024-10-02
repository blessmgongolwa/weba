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

                const   halfScreenHeightArea        =   $(".half-screen-height-area");  
                        halfScreenHeightArea.each(function(){
                            var tmpHeight           =   $(window).height()/2;
                                $(this).css("height",tmpHeight);
                                $(this).css("background-size","cover");
                                $(this).css("background-position","center");
                        });

                // 2/3 of the height 
                const   twoThirdScreenHeightArea        =   $(".two-third-screen-height-area");  
                        twoThirdScreenHeightArea.each(function(){
                            var tmpHeight           =   $(window).height()*2/3;
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
