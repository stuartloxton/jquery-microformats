(function($) { 
     
$.microformat = { 
  hCards: [], 
  documentParsed: {
  	hCard 		: false,
	hCalender	: false,
	hEvent		: false,
	XFN			: false	
  },
  hCard: function(settings){ 
  	$('.vcard').each(function() {
		var vCardObject = {};
		var telClass = $(this).find('.tel');
		if($(telClass).find('.type')) {
			$(telClass).find('.type').each(function() {
				var numberWrap = $(this).parent().text();
				alert(numberWrap);
				alert($(this).text());
				var number = numberWrap.replace($(this).text(),'');
				eval('vCardObject.tel.'+$(this).text()+' = '+number+';')		
				console.log(vCardObject.tel);
			});
		} else {
			if($(telClass).find('abbr')) {
				var telValue = $(telClass).find('abbr').attr('title');
			} else {
				var telValue = $(telClass).text();
			}
		}
		
		/* NAMES */
		vCardObject.fn = $(this).find('.fn').text();
		vCardObject.familyName = $(this).find('.family-name').text();
		vCardObject.givenName = $(this).find('.given-name').text();
		vCardObject.additionalName = $(this).find('.additional-name').text();
		vCardObject.honorificPrefix = $(this).find('.honorific-prefix').text();
		vCardObject.honorificSuffix = $(this).find('.honorific-suffix').text();
		vCardObject.nickname = $(this).find('.nickname').text();
		
		/* CONTACT */
		vCardObject.email = $(this).find('.email').text();
		vCardObject.url = $(this).find('a.url').attr('href');
		vCardObject.tel = {};
		
		//alert(vCardObject.tel);
	});	
	this.documentParsed.hCard = true;
	return this.hCards;		
  } 
}; 
 
})(jQuery); 
