jQuery.microformats = { 
	hCards: [],
	hCalendars: [],
	hReviews: [],
	XFN: [],
	documentParsed: {
		hCard 		: false,
		hCalender	: false,
		hEvent		: false,
		XFN			: false	
	},
	hCard: function(target, settings){ 
		jQuery(target).find('.vcard').each(function() {
			var vCardObject = {};
	
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
			vCardObject.tel = [];
			var telClass = $(this).find('.tel');
			if(jQuery(telClass).find('.type')) {
				jQuery(telClass).find('.type').each(function() {
					var type = jQuery(this).text();
					if(jQuery(this).parent().find('abbr').length == 1) {
						var number = jQuery(this).parent().find('abbr').attr('title');
					} else {
						var numberWrap = jQuery(this).parent().text();
						var number = numberWrap.replace(jQuery(this).text(),'');
						number = jQuery.trim(number);
					}
					var telObj = { type : type, number : number };
					vCardObject.tel.push(telObj);
				});
			} else {
				if(jQuery(telClass).find('abbr').lenght == 1) {
					var number = jQuery(telClass).find('abbr').attr('title');
				} else {
					var number = jQuery(telClass).text();
				}
				var telObj = { type : "undefined", number : number };
				vCardObject.tel.push(telObj);
			}
		});	
		this.documentParsed.hCard = true;
		return this.hCards;		
	},
	hCalendar : function(settings) {
		
	},
	hReview : function(settings) {
		
	},
	scanXFN: function(settings) {
		
	},
	parseLocal : function(settings) {
		settings = jQuery.extend({
			microformats: "all",
			appendToLocal: true
		}, settings);
		jQuery.microformats.hCard(jQuery(document));
	},
	parseRemote : function(target, settings) {
		settings = jQuery.extend({
			microformats: "all",
			appendToLocal: false
		}, settings);
		
	}
};
