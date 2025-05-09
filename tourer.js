//
// Tourer V1.0.12
// Created By Bless Mgongolwa
//

$(document).ready(
    function(){
        const   html_entities   =   {"&quot;":'"',"&apos;":"'","&lt;":"<","&gt;":">","&amp;":"&"}  
        const   replacements    =   {'="':"='",'=\\"':"='",'">':"'>",'\\">':"'>"};
                //
                //
        var     link_mode       =   'button',
                dark_color      =   'dark',
                light_color     =   'white';

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

                    const   unwantedDoubleQuotesRegex   =   new RegExp('(?<![\\[\\{\\:\\,])"(?![\\:\\,\\}\\]])', 'gi')
                            if(unwantedDoubleQuotesRegex.test(content)){
                                content     =   content.replace(unwantedDoubleQuotesRegex,"'");
                            }

                            // replace links with buttons
                            return link_replacer(content);//
                }

                // replace links with a buttons and text should be domain name
                function link_replacer(content){

                    //
                    const   matches     =   content.match(new RegExp('(?<!(\'|"))((https|http):\\/\\/)(www\\.)?(([a-z0-9\\_\\-]+){1,2})((\\.[a-z]+){1,2})((\\/[a-z0-9\\_\\%\\&\\;\\-]+){1,})?(\\/)?','gi'));
                            if(matches){
                                
                                // filter unique links
                                var     links   =   [];
                                        for(const i in matches){
                                            const   link    =   matches[i]; 
                                                    if(!links.includes(link)){    links.push(link);   }
                                        }

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

                                    var     linkButton      =   "<a href='"+link+"' class='btn d-inline-block fit-content p-1 px-2 ml-2 ms-2 rounded-2 bg-"+dark_color+" text-"+light_color+" fw-normal lh-sm '>"+link_name+"</a>";
                                            switch(link_mode){
                                                case "button":
                                                                    linkButton      =   "<a href='"+link+"' class='btn d-inline-block fit-content p-1 px-2 ml-2 ms-2 rounded-2 bg-"+dark_color+" text-"+light_color+" fw-normal lh-sm '>"+link_name+"</a>";
                                                                    break;
                                                case "underline":
                                                                    linkButton      =   "<a href='"+link+"' class='btn d-inline-block fit-content p-1 ml-2 ms-2 rounded-2 bg-transparent text-"+light_color+" fw-bold lh-sm border-bottom border-bottom-1 border-bottom-dark'>"+link_name+"</a>";
                                                                    break;
                                            }
                                            content         =   content.replace(new RegExp(link,'gi'),linkButton);
                                }
                            }

                            //
                            return content; 
                }

                // tabs for tour post, rates, includes & excludes, book now and etc
                if($("div.itinerary-tabs").length>0){

                    const   domain                          =   window.location.origin;
                    //
                    const   itinerary_tab                   =   $("button.itinerary-tab");
                    const   itinerary_tab_content           =   $("div.itinerary-tab-content");
                    const   itinerary_booking_form_area     =   $("div.itinerary-booking-form-area");
                    const   json_data                       =   JSON.parse($("div.itinerary-tabs").attr('data-json'));
                            //
                    const   data_daily_images_orientation   =   itinerary_tab_content.attr('data-daily-images-orientation')?itinerary_tab_content.attr('data-daily-images-orientation'):'right';
                            link_mode                       =   itinerary_tab_content.attr('data-link-mode')?itinerary_tab_content.attr('data-link-mode'):'button';
                            dark_color                      =   itinerary_tab_content.attr('data-dark-color')?itinerary_tab_content.attr('data-dark-color'):'dark';
                            light_color                     =   itinerary_tab_content.attr('data-light-color')?itinerary_tab_content.attr('data-light-color'):'white';

                            itinerary_tab.click(
                                function(){

                                    // reset buttons colors and backgrounds
                                    $("button.itinerary-tab").each(
                                        function(){
                                            $(this).removeClass("bg-dark bg-"+light_color+" border-"+light_color+" text-"+dark_color).addClass("bg-"+dark_color+" border-"+dark_color+" text-"+light_color);
                                        }
                                    )


                                    // change clicked button background and color
                                    $(this).removeClass("bg-dark bg-"+dark_color+" border-"+dark_color+" text-"+light_color).addClass("bg-"+light_color+" border-"+light_color+" text-"+dark_color);

                                    const   tab     =   $(this).attr("data-tab");
                                    var     content =   '';
                                            //
                                            switch(tab){
                                                case "highlight":
                                                                        var     img_link    =   domain+'/cms/attachments/def.webp';
                                                                                if(json_data.cfiles!="none"){
                                                                                    const   image   =   json_data.cfiles.split(',').find((file)=>new RegExp('\\.(webp|png|jpg|jpeg|svg|avif|gif|bitmap)$','gi').test(file));
                                                                                            if(image){
                                                                                                img_link    =   domain+'/cms/'+image;
                                                                                            }
                                                                                }

                                                                                //
                                                                                content     =   '<div class="scol-12 p-0 m-0 mb-3"> <img src="'+img_link+'" alt="'+decode_html(json_data.ctitle)+'" class="col-12 p-0 m-0"/> </div>'+
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
                                                                            var     days        =   [];

                                                                                    //
                                                                                    // check if you can parse json
                                                                                    try{                        days    =   JSON.parse(extra_content);  }
                                                                                    catch(json_parse_error){  
                                                                                        //console.log(json_parse_error)
                                                                                        days    =   [];                         
                                                                                    }
                                                                            
                                                                                    //
                                                                            var     day_number  =   0;
                                                                                    for(const index in days){
                                                                                        const   day     =   days[index];
                                                                                                //
                                                                                                // make sure day is proper json string
                                                                                                if(day!=null&&typeof(day.title)=='string'){
                                                                                                    day_number     +=    1;
                                                                                                    //
                                                                                                    if(Array.isArray(day.files)&&day.files.length>0){
                                                                                                        const   first_image_url     =   domain+'/cms/'+day.files[0];
                                                                                                        var     other_images        =   '';
                                                                                                                if(day.files.length>1){
                                                                                                                    //
                                                                                                                    for(const file in day.files){
                                                                                                                        //
                                                                                                                        if(file!=0){
                                                                                                                            //
                                                                                                                            const   other_image     =   domain+'/cms/'+day.files[file];
                                                                                                                                    other_images   +=   '<div class="col-3 p-2 m-0"><div class="col-12 p-0 m-0 day-other-image rounded-3 border border-1 border-dark square-area" style="background:url(\''+other_image+'\');" data-image="'+other_image+'" data-main-image="day-'+index+'-main-image"></div></div>';
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                        
                                                                                                                if(data_daily_images_orientation=="left"){
                                                                                                                    content        +=   '<div class="col-12 p-0 m-0 mb-4">'+
                                                                                                                                            '<div class="col-12 p-0 m-0 mb-3 fw-bold text-dark" style="margin-left:-10px !important;"> <i class="bi-check-circle-fill p-0 m-0 lh-1 align-middle pe-2 h5"></i> Day '+day_number+' : '+day.title+' </div>'+
                                                                                                                                            '<div class="col-12 p-0 m-0 html-content text-dark text-justify ps-4">'+
                                                                                                                                                '<div class="row p-0 m-0">'+
                                                                                                                                                    '<div class="col-lg-5 col-md-5 col-12">'+
                                                                                                                                                        '<img src="'+first_image_url+'" alt="'+day.title+'" class="day-'+index+'-main-image col-12 p-0 m-0"/>'+
                                                                                                                                                        '<div class="row p-0 m-0">'+other_images+'</div>'+
                                                                                                                                                    '</div>'+
                                                                                                                                                    '<div class="col-lg-7 col-md-7 col-12 p-0 m-0 ps-lg-2 ps-md-2 ps-0 mb-lg-0 mb-md-0 mb-3">'+day.content+'</div>'+
                                                                                                                                                '</div>'+
                                                                                                                                            '</div>'+
                                                                                                                                        '</div>';
                                                                                                                }
                                                                                                                else{
                                                                                                                    content        +=   '<div class="col-12 p-0 m-0 mb-4">'+
                                                                                                                                            '<div class="col-12 p-0 m-0 mb-3 fw-bold text-dark" style="margin-left:-10px !important;"> <i class="bi-check-circle-fill p-0 m-0 lh-1 align-middle pe-2 h5"></i> Day '+day_number+' : '+day.title+' </div>'+
                                                                                                                                            '<div class="col-12 p-0 m-0 html-content text-dark text-justify ps-4">'+
                                                                                                                                                '<div class="row p-0 m-0">'+
                                                                                                                                                    '<div class="col-lg-7 col-md-7 col-12 p-0 m-0 pe-lg-2 pe-md-2 pe-0 mb-lg-0 mb-md-0 mb-3">'+day.content+'</div>'+
                                                                                                                                                    '<div class="col-lg-5 col-md-5 col-12">'+
                                                                                                                                                        '<img src="'+first_image_url+'" alt="'+day.title+'" class="day-'+index+'-main-image col-12 p-0 m-0"/>'+
                                                                                                                                                        '<div class="row p-0 m-0">'+other_images+'</div>'+
                                                                                                                                                    '</div>'+
                                                                                                                                                '</div>'+
                                                                                                                                            '</div>'+
                                                                                                                                        '</div>';
                                                                                                                }
                                                                                                    }
                                                                                                    else{
                                                                                                        content    +=   '<div class="col-12 p-0 m-0 mb-4">'+
                                                                                                                            '<div class="col-12 p-0 m-0 mb-3 fw-bold text-dark" style="margin-left:-10px !important;"> <i class="bi-check-circle-fill p-0 m-0 lh-1 align-middle pe-2 h5"></i> Day '+day_number+' : '+day.title+' </div>'+
                                                                                                                            '<div class="col-12 p-0 m-0 html-content text-dark text-justify ps-4">'+day.content+'</div>'+
                                                                                                                        '</div>';
                                                                                                    }
                                                                                                }
                                                                                    }
                                                                                    content    +=   '</div>';

                                                                                    $(document).on('click','div.day-other-image',function(){
                                                                                        //
                                                                                        const    mainImage  =    $('img.'+$(this).attr('data-main-image'));
                                                                                        const    imageUrl   =    $(this).attr('data-image');

                                                                                                //
                                                                                                //
                                                                                                mainImage.attr('src',imageUrl);

                                                                                                //
                                                                                                $('div.day-other-image').each(function(){
                                                                                                    $(this).removeClass("border-1").addClass('border-0');
                                                                                                });

                                                                                                $(this).addClass("border-1");
                                                                                    })
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
});