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

                    

                    const   matches =   content.match(/[^\\{\\:\\,]"[^\\:,]/gi);
                            matches.map(
                                function(match){
                                    content    =   content.replaceAll(match,match.replace(new RegExp('"','gi'),'\\"'))
                                }
                            );

                            return content;
                }

                function clean_content(content){

                    Object.keys(replacements).map(
                        function(key){
                            content    =   content.replace(new RegExp(key,'gi'),replacements[key]); 
                        }
                    );
                    
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
