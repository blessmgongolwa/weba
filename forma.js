$(document).ready(function(){

    const   formSubmitButton    =   ".forma-button";
            $(document).on("click",formSubmitButton,function(e){
                e.preventDefault();
                //
                const   emailRegex          =   new RegExp('([a-z0-9\\_\\.\\-]+)@(([0-9a-z\\_\\-]+){1,2})(\\.[a-z]{2,6}){1,2}','gi');
                const   mobileRegex         =   new RegExp('[0-9\\s\\+\\-]+','gi');
                const   forma               =   $(this).closest("form");
                const   formaInputs         =   forma.find('input,select,textarea');
                const   formaErrorArea      =   forma.find(".forma-error");

                var     formError           =   0;
                var     formErrorMessage    =   '';
                        //
                        //
                        formaInputs.each(function(){
                            const   formInput       =   $(this);
                            const   inputValue      =   formInput.val();
                            const   inputValueType  =   formInput.attr("data-type");
                            const   inputValueName  =   formInput.attr("name");
                                    // console.log(inputValue);
                                    //
                                    if(inputValue.length>0){
                                        switch(inputValueType){
                                            case "email":
                                                            if(!emailRegex.test(inputValue)){
                                                                formError++;
                                                                formErrorMessage    =   'Please enter valid email';
                                                                return false;
                                                            }
                                                            break;
                                            case "mobile":
                                                            if(!mobileRegex.test(inputValue)){
                                                                formErrorMessage    =   'Please enter valid mobile number';
                                                                formError++;
                                                                return false;
                                                            }
                                                            break;
                                        }
                                    }
                                    else{
                                        formError++;
                                        formErrorMessage    =   'Please enter '+inputValueName.replace(/[\_\-]/gi,' ');
                                        formInput.focus();
                                        return false;
                                    }
                        });

                        //
                        //
                        if(formError==0){
                            forma.submit();
                        }
                        else{
                            //
                            formaErrorArea.html(formErrorMessage);
                        }
            });
});