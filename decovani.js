setInterval(resizer,100)
//var		angle	=	0;
function resizer(){
    console.log('here')
    const   squareArea      	=   document.getElementsByClassName('square-area');
			if(squareArea.length>0){
				for(const area in squareArea){
					const   element             =   squareArea[area];
							if(typeof(element)=='object'){
								element.style.height    =   element.offsetWidth.toString()+'px';
							}
				}
			}

    const   doubleWidthHeight	=   document.getElementsByClassName('double-width-height');
			if(doubleWidthHeight.length>0){
				for(const area in doubleWidthHeight){
					const   element             =   doubleWidthHeight[area];
							if(typeof(element)=='object'){
								element.style.height    =   (element.offsetWidth*2).toString()+'px';
							}
				}
			}

    const   goldenRatioArea =   document.getElementsByClassName('golden-ratio-area');
			if(goldenRatioArea.length){
				for(const area in goldenRatioArea){
					const   element                 =   goldenRatioArea[area];
							if(typeof(element)=='object'){
								element.style.height    =   (element.offsetWidth/1.618).toString()+'px';
							}
				}
			}

	const	roundStatusLoader	=	document.getElementsByClassName('round-status-loader');// round-status-loader-knob
	
			if(roundStatusLoader.length>0){
				//console.log(roundStatusLoader);
				for(const i in roundStatusLoader){
					const	loader	=	roundStatusLoader[i];
							//
							if(typeof(loader)=='object'){
								
								const	diameter		=	loader.offsetWidth;
								const	radius			=	diameter/2;

								// knob a small circle on border
								// need to reduce its radius because it affect position 
								const	knob				=	loader.querySelector('.round-status-loader-knob');
								const	knobDiameter		=	knob.offsetWidth;
								const	knobRadius			=	knobDiameter/2;
								const	knobAngle			=	knob.getAttribute('data-angle')*1;
										//
								var		distanceFromTop		=	0;
								var		distanceFromRight	=	0;
										if(knobAngle<=90){
											const	triangleAngle			=	90 - knobAngle;
											const	xdistanceFromCenter		=	radius*Math.cos(triangleAngle*Math.PI/180) // from CAH // SOHCAHTOA
											const	ydistanceFromCenter		=	radius*Math.sin(triangleAngle*Math.PI/180) // from SOH
			
			
													distanceFromTop			=	(radius+ydistanceFromCenter-knobRadius)*100/diameter;
													distanceFromRight		=	(radius+xdistanceFromCenter-knobRadius)*100/diameter;
										}
										else if(knobAngle<=180){
											const	triangleAngle			=	knobAngle-90;
											const	xdistanceFromCenter		=	radius*Math.cos(triangleAngle*Math.PI/180) // from CAH // SOHCAHTOA
											const	ydistanceFromCenter		=	radius*Math.sin(triangleAngle*Math.PI/180) // from SOH
			
			
													distanceFromTop			=	(radius-ydistanceFromCenter-knobRadius)*100/diameter;
													distanceFromRight		=	(radius+xdistanceFromCenter-knobRadius)*100/diameter;

										}
										else if(knobAngle<=270){
											const	triangleAngle			=	90-(knobAngle-180);
											const	xdistanceFromCenter		=	radius*Math.cos(triangleAngle*Math.PI/180) // from CAH // SOHCAHTOA
											const	ydistanceFromCenter		=	radius*Math.sin(triangleAngle*Math.PI/180) // from SOH
			
			
													distanceFromTop			=	(radius-ydistanceFromCenter-knobRadius)*100/diameter;
													distanceFromRight		=	(radius-xdistanceFromCenter-knobRadius)*100/diameter;

										}
										else if(knobAngle<=360){
											const	triangleAngle			=	knobAngle-270;
											const	xdistanceFromCenter		=	radius*Math.cos(triangleAngle*Math.PI/180) // from CAH // SOHCAHTOA
											const	ydistanceFromCenter		=	radius*Math.sin(triangleAngle*Math.PI/180) // from SOH
			
			
													distanceFromTop			=	(radius+ydistanceFromCenter-knobRadius)*100/diameter;
													distanceFromRight		=	(radius-xdistanceFromCenter-knobRadius)*100/diameter;

										}

										knob.style.top	=	distanceFromTop+'%';
										knob.style.right	=	distanceFromRight+'%';
							}
				}
			}
				
}
