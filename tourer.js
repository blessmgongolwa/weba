$(document).ready(
    function(){
        const   html_entities   =   {"&quot;":'"',"&apos;":"'","&lt;":"<","&gt;":">","&amp;":"&"}  
        const   replacements    =   {'="':"='",'=\\"':"='",'">':"'>",'\\">':"'>"};

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

                    
                    link_replacer(content);
                    return content;//
                }

                function link_replacer(content){

                    console.log(content);
                    
                    const   matches     =   content.match(new RegExp('((http|https):\/\/)?([a-z0-9\_\-]+)(\.[a-z]+){1,3}(\/[a-z0-9\_\%\+\-]+){0,10}(\/)?','gi'));
                            if(matches){
                                for(i in matches){
                                    const   link            =   matches[i];
                                    const   link_keywords   =   link.match(new RegExp('\b(?!(http|https))\w+\b','gi'));
                                    var     link_name       =   "";
                                            if(link_keywords){
                                                link_name   =   link_keywords[0];
                                            }
                                    const   linkButton      =   "<a href='"+link+"' class='btn d-inline-block fit-content p-1 ml-2 ms-2 rounded-2 bg-primary text-white fw-bold lh-sm'>"+link_name+"</a>"

                                            content         =   content.replace(new RegExp(link,'gi'),linkButton);
                                }
                            }

                            return content;
                }

                // tabs
                if($("div.itinerary-tabs").length>0){
                    const   itinerary_tab                   =   $("button.itinerary-tab");
                    const   itinerary_tab_content           =   $("div.itinerary-tab-content");
                    const   itinerary_booking_form_area     =   $("div.itinerary-booking-form-area");
                    const   json_data                       =   JSON.parse($("div.itinerary-tabs").attr('data-json'));
                            //
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
                                                                        content     =   '<div class="col-12 p-0 m-0 mb-2 html-content text-dark text-justify">'+decode_html(json_data.ccontent)+'</div>';
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
                                                                                        function(day){
                                                                                            content    +=   '<div class="col-12 p-0 m-0 mb-4">'+
                                                                                                                '<div class="col-12 p-0 m-0 mb-3 fw-bold text-dark" style="margin-left:-10px !important;"> <i class="bi-check-circle-fill p-0 m-0 lh-1 align-middle pe-2 h5"></i> '+day.title+' </div>'+
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
    }
);
