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
		var standardAttributes = [
				{name: 'fn', class: '.fn'},
				{name: 'familyName', class: '.family-name'},
				{name: 'givenName', class: '.given-name'},
				{name: 'additionalName', class: '.additional-name'},
				{name: 'honorificPrefix', class: '.honorific-prefix'},
				{name: 'honorificSuffix', class: '.honorific-suffix'},
				{name: 'nickname', class: '.nickname'},
				{name: 'email', class: '.email'},
				{name: 'title', class: '.title'},
				{name: 'logo', class: '.logo'},
				{name: 'sound', class: '.sound'},
				{name: 'bday', class: '.bday'},
				{name: 'org', class: '.org'}
			];
		var nestedAttributes = [
				{name: 'geo', class: '.geo', objects: [
						{name: 'latitude', class: '.latitude'},
						{name: 'longitude', class: '.longitude'}
					]
				},
				{name: 'adr', class: '.adr', objects: [
						{name: 'postOfficeBox', class: '.post-office-box'},
						{name: 'extendedAddress', class: '.extended-address'},
						{name: 'streetAddress', class: '.street-address'},
						{name: 'locality', class: '.locality'},
						{name: 'region', class: '.region'},
						{name: 'postalCode', class: '.postal-code'},
						{name: 'countryName', class: '.country-name'},
					]
				}
			];
		jQuery(target).find('.vcard').each(function() {
			var vCardObject = {};
			var current = this;
			jQuery.each(standardAttributes, function() {
				vCardObject[this.name] = $(current).find(this.class).parseMicroformatAttribute();
			});
			jQuery.each(nestedAttributes, function() {
				var i = this;
				vCardObject[this.name] = {};
				jQuery.each(this.objects, function() {
					vCardObject[i.name][this.name] = $(current).find(i.class).find(this.class).parseMicroformatAttribute();
				});
			});
			
			vCardObject.url = $(this).find('a.url').attr('href');
			vCardObject.photo = $(this).find('img.photo').attr('src');
			vCardObject.logo = $(this).find('img.logo').attr('src');
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
