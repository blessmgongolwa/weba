$(document).ready(
    function(){
        const   html_entities   =   {"&quot;":'"',"&apos;":"'","&lt;":"<","&gt;":">","&amp;":"&"}  
        const   replacements    =   {'="':"='",'=\\"':"='",'">':"'>",'\\">':"'>"};
                //
                //
        var     dark_color      =   'dark';
        var     light_color     =   'white';

                // decode html in a content
                function decode_html(content){
                    var     content   =   content.replace(/\\/g,'');
                            //*** decode html entity to html
                            Object.keys(html_entities).map(
                                function(entity){
                                    content     =   content.replaceAll(entity,html_entities[entity]);
                                }
                            );

                            return content;
                }

                // clean content remove slashes and if json escape double quotation
                function clean_content(content){

                    /*Object.keys(replacements).map(
                        function(key){
                            content    =   content.replace(new RegExp(key,'gi'),replacements[key]); 
                        }
                    );*/
                    
                            // on html attributes replace "-double quotes with ' single
                    var     matches     =   content.match(/(([^\\{\\:\\,])([\\=])")|("([\\=\s>]{1,3})([^\\:\\,]))/gi);
                            //
                            if(matches!=null){
                                //
                                matches.map(
                                    function(match){
                                        content    =   content.replace(new RegExp(match,'gi'),match.replace(new RegExp('"','gi'),"'"))
                                    }
                                );
                            }

                            // add slashes on quoted text
                            matches     =   content.match(/[^\[\\{\\:\\,]"[^\]\\}\\:,]/gi);
                            //
                            if(matches!=null){
                                matches.map(
                                    function(match){
                                        content    =   content.replace(new RegExp(match,'gi'),match.replace(new RegExp('"','gi'),'\\"'))
                                    }
                                );
                            }

                    
                    return link_replacer(content);//
                }

                // replace links with a buttons and text should be domain name
                function link_replacer(content){
                    console.log(content);
                    const   matches     =   content.match(new RegExp('((https|http):\\/\\/)(www\\.)?(([a-z0-9\\_\\-]+){1,2})((\\.[a-z]+){1,2})((\\/[a-z0-9\\_\\%\\&\\;\\-]+){1,})?(\\/)?','gi'));
                            console.log(matches);
                            if(matches){
                                
                                // filter unique links
                                var     links   =   [];
                                        for(const i in matches){
                                            const   link    =   matches[i]; 
                                                    if(!links.includes(link)){    links.push(link);   }
                                        }

                                //console.log(links);
                                for(i in links){
                                    const   link            =   links[i];
                                    const   link_keywords   =   link.match(new RegExp('\\b(?!(http|https))\\w+\\b','gi'));
                                    var     link_name       =   "";
                                            if(link_keywords){
                                                link_name   =   link_keywords[0];
                                                if(link_name.toLowerCase()=="www"){
                                                    link_name   =   link_keywords[1];
                                                }
                                            }
                                    const   linkButton      =   "<a href='"+link+"' class='btn d-inline-block fit-content p-1 px-2 ml-2 ms-2 rounded-2 bg-"+dark_color+" text-"+light_color+" fw-normal lh-sm '>"+link_name+"</a>";

                                            content         =   content.replace(new RegExp(link,'gi'),linkButton);
                                }
                            }

                            //console.log(content);
                            return content; 
                }

                // tabs for tour post, rates, includes & excludes, book now and etc
                if($("div.itinerary-tabs").length>0){
                    const   itinerary_tab                   =   $("button.itinerary-tab");
                    const   itinerary_tab_content           =   $("div.itinerary-tab-content");
                    const   itinerary_booking_form_area     =   $("div.itinerary-booking-form-area");
                    const   json_data                       =   JSON.parse($("div.itinerary-tabs").attr('data-json'));
                            //
                            dark_color                      =   itinerary_tab_content.attr('data-dark-color')?itinerary_tab_content.attr('data-dark-color'):'dark';
                            light_color                     =   itinerary_tab_content.attr('data-light-color')?itinerary_tab_content.attr('data-light-color'):'white';

                            itinerary_tab.click(
                                function(){

                                    // reset buttons colors and backgrounds
                                    $("button.itinerary-tab").each(
                                        function(){
                                            $(this).removeClass("bg-primary border-primary").addClass("bg-dark border-dark")
                                        }
                                    )


                                    // change clicked button background and color
                                    $(this).removeClass("bg-dark border-dark").addClass("bg-primary border-primary");

                                    const   tab     =   $(this).attr("data-tab");
                                    var     content =   '';
                                            //
                                            switch(tab){
                                                case "highlight":
                                                                        const   domain      =   window.location.origin;
                                                                        var     img_link    =   domain+'/cms/attachments/def.webp';
                                                                                if(json_data.cfiles!="none"){
                                                                                    const   image   =   json_data.cfiles.split(',').find((file)=>new RegExp('\\.(webp|png|jpg|jpeg|svg|avif|gif|bitmap)$','gi').test(file));
                                                                                            if(image){
                                                                                                img_link    =   domain+'/cms/attachments/'+image;
                                                                                            }
                                                                                }
                                                                                content     =   '<div class="scol-12 p-0 m-0 mb-3"> <img src="'+img_link+'" alt="'+decode_html(json_data.ctitle)+'" col-12 p-0 m-0/> </div>'+
                                                                                                '<div class="col-12 p-0 m-0 mb-2 html-content text-dark text-justify">'+decode_html(json_data.ccontent)+'</div>';
                                                                        break;
                                                case "day-by-day":
                                                                        if(json_data.extra_content!="none"){
                                                                            var     extra_content   =   decode_html(json_data.extra_content);
                                                                                    extra_content   =   clean_content(extra_content);
                                                                                    // clean decoded html to clean one and removing repetation
    
    
                                                                                    //
                                                                                    // prepare day by day iotinerary
                                                                                    content     =   '<div class="col-12 p-0 m-0 border-start border-start-1 border-dark ">';
                                                                                    JSON.parse(extra_content).map(
                                                                                        function(day,index){
                                                                                            content    +=   '<div class="col-12 p-0 m-0 mb-4">'+
                                                                                                                '<div class="col-12 p-0 m-0 mb-3 fw-bold text-dark" style="margin-left:-10px !important;"> <i class="bi-check-circle-fill p-0 m-0 lh-1 align-middle pe-2 h5"></i> Day '+(index+1)+' </div>'+
                                                                                                                '<div class="col-12 p-0 m-0 html-content text-dark ps-4 fw-bold"> '+day.title+' </div>'+
                                                                                                                '<div class="col-12 p-0 m-0 html-content text-dark text-justify ps-4">'+day.content+'</div>'+
                                                                                                            '</div>';
                                                                                        }
                                                                                    );
                                                                                    content    +=   '</div>';   
                                                                        }
                                                                        
                                                                        break;
                                                case "includes":
                                                                        content     =   '<div class="col-12 p-0 m-0 mb-2 html-content text-dark text-justify px-3">'+decode_html(json_data.cdata4)+'</div>';
                                                                        break;
                                                case "excludes":
                                                                        content     =   '<div class="col-12 p-0 m-0 mb-2 html-content text-dark text-justify px-3">'+decode_html(json_data.cdata5)+'</div>';
                                                                        break;
                                                    
                                                case "includes-excludes":
                                                                        content     =   '<div class="col-12 p-0 m-0 mb-2 px-3">'+
                                                                                            '<div class="row p-0 m-0 align-items-start justify-content-start">'+
                                                                                                '<div class="col-lg-6 col-md-6 col-12 p-0 m-0 pe-lg-2 pe-md-2 pe-0">'+
                                                                                                    '<div class="col-12 p-0 m-0 mb-3 fw-bold text-start text-dark">Package Includes</div>'+
                                                                                                    '<div class="col-12 p-0 m-0 html-content text-dark text-justify">'+decode_html(json_data.cdata4)+'</div>'+
                                                                                                '</div>'+
                                                                                                '<div class="col-lg-6 col-md-6 col-12 p-0 m-0 ps-lg-2 ps-md-2 ps-0">'+
                                                                                                    '<div class="col-12 p-0 m-0 mb-3 fw-bold text-start text-dark">Package Excludes</div>'+
                                                                                                    '<div class="col-12 p-0 m-0 html-content text-dark text-justify">'+decode_html(json_data.cdata5)+'</div>'+
                                                                                                '</div>'+
                                                                                            '</div>'+
                                                                                        '</div>';
                                                                        break;
                                                    
                                                case "rates":
                                                                        content     =   '<div class="col-12 p-0 m-0 mb-2 html-content text-dark text-justify px-3">'+decode_html(json_data.cdata3)+'</div>';
                                                                        break;

                                                case "book-inerary":
                                                                        //
                                                                        break;
                                            }

                                            if(tab=="book-inerary"){
                                                //
                                                itinerary_booking_form_area.removeClass("d-none").addClass("d-block");
                                                itinerary_tab_content.removeClass("d-block").addClass("d-none");
                                            }
                                            else{
                                                itinerary_booking_form_area.removeClass("d-block").addClass("d-none");
                                                itinerary_tab_content.removeClass("d-none").addClass("d-block");
                                                itinerary_tab_content.html(content);    
                                            }
                                            
                                }
                            );
                }

        // days range seeker update days selected.
        var     daysRangeArea   =   $("div#days-range-area");
        var     daysRangeInput  =   $("input.days-range-input");
                daysRangeInput.change(
                    function(){
                        //
                        // 
                        daysRangeArea.html(daysRangeInput.val()+" day(s) picked");
                    }
                )
    }
);

$(window).on('load',function(){//
    //
    // lazy load images
    try{
        //
        var     lazyLoadInstance    =   new LazyLoad({
                                            // Your custom settings go here
                                                
                                        });

    }
    catch(lazy_load_error){
        
    }

    const   laterMedia          =   $(".later-media");
            laterMedia.each(
                function(){
                    //console.log($(this).attr("data-later-bg"));
                    if($(this).prop("tagName").toLowerCase()=='img'){
                        $(this).attr("src",$(this).attr("later-media"));
                    }
                    else{
                        $(this).css("background-image","url("+$(this).attr("later-media")+")");
                    }
                }
            );
});