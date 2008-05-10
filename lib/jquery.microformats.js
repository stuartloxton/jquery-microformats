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
			vCardObject.adr = {};
			vCardObject.adr.postOfficeBox = $(this).find('.adr').find('.post-office-box').text();
			vCardObject.adr.extendedAddress = $(this).find('.adr').find('.extended-address').text();
			vCardObject.adr.streetAddress = $(this).find('.adr').find('.street-address').text();
			vCardObject.adr.locality = $(this).find('.adr').find('.locality').text();
			vCardObject.adr.region = $(this).find('.adr').find('.region').text();
			vCardObject.adr.postalCode = $(this).find('.adr').find('.postal-code').text();
			vCardObject.adr.countryName = $(this).find('.adr').find('.country-name').text();
			
			vCardObject.geo = {};
			vCardObject.geo.latitude = $(this).find('.latitude').text();
			vCardObject.geo.longitude = $(this).find('.longitude').text();
			
			vCardObject.title = $(this).find('.title').text();
			vCardObject.role = $(this).find('.role').text();
			
			vCardObject.org = {};
			vCardObject.org.organisationName = $(this).find('.organisation-name').text();
			vCardObject.org.organisationUnit = $(this).find('.organisation-unit').text();
			
			vCardObject.photo = $(this).find('.photo').text();
			vCardObject.logo = $(this).find('.logo').text();
			vCardObject.sound = $(this).find('.sound').text();
			vCardObject.bday = $(this).find('.bday').text();
			jQuery.microformats.hCards.push(vCardObject);
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
