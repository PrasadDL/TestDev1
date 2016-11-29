/* 
8/23/2016 
Description- The button that populates insurance affiliation records 
*/ 

//Call product service class 

/* 
Author: Prasad D. Lakhangaonkar 
Date:11th August 2016 
Description: 
The JS function to populate insurance affiliation records 
jQuery Libs: All are loaded over the CDN, not used static resources 
*/ 

{!REQUIRESCRIPT("/soap/ajax/31.0/connection.js")} 
{!REQUIRESCRIPT("/soap/ajax/18.0/apex.js")} 
{!REQUIRESCRIPT('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js')} 
{!REQUIRESCRIPT('//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js')} 

try{ 
jQuery(function() { 
//Append the jQuery CSS CDN Link to the Head tag. 
// The CSS file does not work requirescript function in button, hence jQuery function 
jQuery('head').append('<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/start/jquery-ui.css" type="text/css" />'); 

//Create the HTML(DIV Tag) for the Dialog. 
var html = '<div id="dialog" title="Insurance Affiliation records"><p>1.Insert records: Click Insert <br/>2.Get records size: Click Size<br/></p><div id="myDialogText"></div> </div>'; 

//Check if the Dialog(DIV Tag) already exists if not then Append the same to the Body tag. 

if(!jQuery('[id=dialog]').size()){ 
jQuery('body').append(html); 
} 

//Open the jQuery Dialog. 
jQuery( "#dialog" ).dialog({ 
autoOpen: true, 
modal: true, 
show: { 
effect: "bounce", 
duration: 500 
}, 
hide: { 
effect: "bounce", 
duration: 500 
}, 

open: function(event, ui) { jQuery('.ui-dialog-titlebar-close').hide(); }, 
buttons: { 
Insert: function() { 
//location.replace('/home/home.jsp'); 
jQuery("#myDialogText").text('Result: '+'Processing'); 
functionInsert(); 
//jQuery( this ).dialog( "close" ); 
}, 
Size: function() { 
jQuery("#myDialogText").text('Result: '+'Processing'); 
functionSize(); 
//jQuery( this ).dialog( "close" ); 
}, 
Close: function() { 
//myFunction(); 
location.reload(true); 
jQuery( this ).dialog( "close" ); 
} 
} 
}); 
}); 
function functionInsert() { 
//this should be ajax call, need to have a call back function 
//alert('Call insert function here '); 
//jQuery("#myDialogText").text('Result: '+'Processing'); 
var msg = sforce.apex.execute("Product_Service","createInsuranceAffiliationRecords",{productIds: "{!Product2.Id}", countRequest: false}); 
//alert(msg); 
jQuery("#myDialogText").text('Result: '+msg); 
} 

function functionSize() { 
//this should be ajax call, need to have a call back function 
//alert('Call size function here'); 
//jQuery("#myDialogText").text('Result: '+'Processing'); 
var msg = sforce.apex.execute("Product_Service","createInsuranceAffiliationRecords",{productIds: "{!Product2.Id}", countRequest: true}); 
//alert(msg); 
jQuery("#myDialogText").text('Result: '+msg); 
} 
}//try ends 
catch(e){ 
alert('An Error has Occured. Error: ' + e); 
}