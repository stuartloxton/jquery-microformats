jQuery.fn.parseMicroformatAttribute = function() {
	if(jQuery(this).find('abbr').length == 1) {
		return jQuery(this).find('abbr').attr('title');	
	} else {
		return jQuery(this).text();	
	}
};
jQuery.microformats = { 
	
	availableFormats: ['hCard', 'hCalendar', 'hReview', 'XFN'],
	hCards: [],
	hCalendars: [],
	hReviews: [],
	XF: [],
	documentParsed: {
		hCard 		: false,
		hCalender	: false,
		hEvent		: false,
		XFN			: false	
	},
	hCard: function(target, settings){ 
		console.log('begginging hCard');
		console.log(settings);
		console.log(settings.appendToLocal);
		var foundHCards = [];
		jQuery(target).find('.vcard').each(function() {
			var vCardObject = {};
	
			/* NAMES */
			vCardObject.fn = $(this).find('.fn').parseMicroformatAttribute();
			vCardObject.familyName = $(this).find('.family-name').parseMicroformatAttribute();
			vCardObject.givenName = $(this).find('.given-name').parseMicroformatAttribute();
			vCardObject.additionalName = $(this).find('.additional-name').parseMicroformatAttribute();
			vCardObject.honorificPrefix = $(this).find('.honorific-prefix').parseMicroformatAttribute();
			vCardObject.honorificSuffix = $(this).find('.honorific-suffix').parseMicroformatAttribute();
			vCardObject.nickname = $(this).find('.nickname').parseMicroformatAttribute();
			
			/* CONTACT */
			vCardObject.email = $(this).find('.email').parseMicroformatAttribute();
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
				if(jQuery(telClass).find('abbr').length == 1) {
					var number = jQuery(telClass).find('abbr').attr('title');
				} else {
					var number = jQuery(telClass).text();
				}
				var telObj = { type : "undefined", number : number };
				vCardObject.tel.push(telObj);
			}
			vCardObject.adr = {};
			vCardObject.adr.postOfficeBox = $(this).find('.adr').find('.post-office-box').parseMicroformatAttribute();
			vCardObject.adr.extendedAddress = $(this).find('.adr').find('.extended-address').parseMicroformatAttribute();
			vCardObject.adr.streetAddress = $(this).find('.adr').find('.street-address').parseMicroformatAttribute();
			vCardObject.adr.locality = $(this).find('.adr').find('.locality').parseMicroformatAttribute();
			vCardObject.adr.region = $(this).find('.adr').find('.region').parseMicroformatAttribute();
			vCardObject.adr.postalCode = $(this).find('.adr').find('.postal-code').parseMicroformatAttribute();
			vCardObject.adr.countryName = $(this).find('.adr').find('.country-name').parseMicroformatAttribute();
			
			vCardObject.geo = {};
			vCardObject.geo.latitude = $(this).find('.latitude').parseMicroformatAttribute();
			vCardObject.geo.longitude = $(this).find('.longitude').parseMicroformatAttribute();
			
			vCardObject.title = $(this).find('.title').parseMicroformatAttribute();
			vCardObject.role = $(this).find('.role').parseMicroformatAttribute();
			
			vCardObject.org = {};
			vCardObject.org.organisationName = $(this).find('.organisation-name').parseMicroformatAttribute();
			vCardObject.org.organisationUnit = $(this).find('.organisation-unit').parseMicroformatAttribute();
			
			vCardObject.photo = $(this).find('.photo').attr('src');
			vCardObject.logo = $(this).find('.logo').parseMicroformatAttribute();
			vCardObject.sound = $(this).find('.sound').parseMicroformatAttribute();
			vCardObject.bday = $(this).find('.bday').parseMicroformatAttribute();
			if(settings.appendToLocal == true) {
				jQuery.microformats.hCards.push(vCardObject);
			}
			foundHCards.push(vCardObject);
		});	
		this.documentParsed.hCard = true;
		return this.hCards;		
	},
	hCalendar : function(settings) {
		
	},
	hReview : function(settings) {
		
	},
	XFN: function(settings) {
		
	},
	parseLocal : function(settings) {
		settings = jQuery.extend({
			microformats: "all",
			appendToLocal: true
		}, settings);
		if(typeof(settings.microformats) == "string") {
			if(settings.microformats == 'all') {
				settings.microformats = this.availableFormats;
			} else {
				settings.microformats = [settings.microformats];	
			}
		}
		var passedSettings = {
			appendToLocal: settings.appendToLocal	
		}
		console.log('in parseLocal');
		console.log(passedSettings);
		for(i = 0; i < settings.microformats.length; i++) {
			if(jQuery.isFunction(eval('jQuery.microformats.'+settings.microformats[i]))) {
				eval('jQuery.microformats.'+settings.microformats[i]+'(document, passedSettings)');
			}
		}
	},
	parseRemote : function(target, settings) {
		settings = jQuery.extend({
			microformats: "all",
			appendToLocal: false
		}, settings);
		
	}
};
