//Standard Reusable LightWeight jQuery Plugins
jQuery.fn.extend({
	tabs: function(options) {
		var defaults = {
			active: 1,
			duration: 200,
			navClass: 'y-tabs',
			ytBodyClass: 'yt-body',
			selectedClass: 'selected',
			disabledClass: 'disabled'
		};
		return this.each(function() {
			var o = $.extend(defaults, options);
			var obj = $(this);
			var links = $('li', obj);
			var parentDiv = obj.parent('div');
			var tabDivs = obj.siblings('div.'+o.ytBodyClass);
			tabDivs.hide();
			tabDivs.eq(o.active-1).show();
			links.eq(o.active-1).addClass(o.selectedClass);
			links.click(function() {
				var link = $('li', obj).index(this);
				links.each(function() {
					$(this).removeClass(o.selectedClass);
				});
				$(this).parent('ul.'+o.navClass).siblings('div.'+o.ytBodyClass).slideUp();
				$(this).parent('ul.'+o.navClass).siblings('div.'+o.ytBodyClass).eq(link).slideDown();
				$(this).addClass(o.selectedClass);
			});
			if (parentDiv.hasClass(o.ytBodyClass)) { //means this is subtab
				parentDiv.children('div.'+o.ytBodyClass).hide();
				parentDiv.children('ul.'+o.navClass).children('li').removeClass(o.selectedClass);
				parentDiv.children('div.'+o.ytBodyClass).eq(0).fadeIn(o.duration);
				parentDiv.children('ul.'+o.navClass).children('li').eq(0).addClass(o.selectedClass);
			}
		});
	},
	accordion: function(options) {
		var defaults = {
			active: 0,
			style: 'collapse',		//collapse | expand
			activeClass: 'red'
		};
		return this.each(function() {
			var o = $.extend(defaults, options);
			var obj = $(this);
			var items = $('ul', obj);
			items.hide();
			items.eq(o.active-1).show();
			$('li a', obj).click(function() {
				$('li', obj).removeClass(o.activeClass);
				var parent = this.parentNode.parentNode.id;
				var nextElt = $(this).next();
				if ( o.activeClass != '' )
					$(this.parentNode).addClass(o.activeClass);
				if ( o.style == 'expand' ) {
					$(this).next().slideToggle('normal');
					return false;
				}
				if((nextElt.is('ul') && (nextElt.is(':visible')))) {
					$('#' + parent + ' ul:visible').slideUp('normal');
				}
				if((nextElt.is('ul')) && (!nextElt.is(':visible'))) {
					$('#' + parent + ' ul:visible').slideUp('normal');
					nextElt.slideDown('normal');
				}
			});
			if ( o.active == 0 )
				items.hide();
		});
	},
	blockUI: function(options) {
		var defaults = {
			msg: "",
			color: "orange",
			bgColor: "#C0C0C0"
		};
		return this.each(function() {
			var obj = $(this);
			var tag = obj.get(0).tagName;
			var o = $.extend(defaults, options);
			$(".ovl,.ovlContent", obj).remove();
			layer = $('<div class="ovl"><div class="ovlContent">'+o.msg+'</div></div>').appendTo(obj);
			var os = $(this).offset(); var posL = os.left; var posT = os.top;
			var posW = $(this).width();	var posH = $(this).height(); var winH = $(window).height();
			$('.ovl',obj).css({backgroundColor:o.bgColor, cursor:"wait", color:o.color, opacity:.79, left:posL, top:posT, width:posW, height:posH});
			if ( tag.toLowerCase() == 'body' ) {
				$('.ovl',obj).css('position','fixed');
				$('.ovlContent',obj).css('margin-top',winH/2);
			} else {
				$('.ovlContent',obj).css({"margin-top":(posH/2)-20});
			}
		});
	},
	unblockUI: function() {
		return this.each(function() {
			var obj = $(this);
			$(".ovl,.ovlContent", obj).animate({opacity:0}, 1000).hide("slow");
		});
	},
	ticker: function() {
		return this.each(function() {
			var obj	=	$(this);
			obj.hover(function(e) {
				$("span", obj).css({top:e.pageY+10, left:e.pageX-5, width:'200px'}).show();
			}, function() {
				$("span", obj).hide();
			});
		});
	},
	tableMgr: function(options) {
		var defaults = {rOdd:'rOdd',rEven:'rEven',rHover:'rHover',rClick:'rClick'};
		return this.each(function() {
			var o = $.extend(defaults, options); var obj = $(this);
			$('tr:odd', obj).addClass(o.rOdd); $('tr:even',obj).addClass(o.rEven);
			$('tr', obj).mouseover(function() {$(this).addClass(o.rHover);}).mouseout(function() {$(this).removeClass(o.rHover);}).click(function() {$(this).toggleClass(o.rClick);});
		});
	},
	cycle: function(options) {
		var obj,  defaults = {frequency:'2000'};
		function doRotate() {
			no_of_ads = $('.adr', obj).size();
			cur_ad	= obj.data('cur_ad');
			next_ad = (cur_ad + 1) % no_of_ads;
			$('.adr', obj).eq(cur_ad).hide(); $('.adr', obj).eq(next_ad).fadeIn('slow');
			obj.data('cur_ad', next_ad);
		}
		return this.each(function() {
			var o = $.extend(defaults, options); obj = $(this); obj.data('cur_ad', 0);
			$('.adr', obj).hide(); $('.adr', obj).eq(0).show();
			window.setInterval(doRotate, o.frequency);
		});
	},
	shuffle: function() {
		return this.each(function() {
			var items = $(this).children().clone(true);
			return (items.length) ? $(this).html(YS.shuffle(items)) : this;
		});
	},
	validator: function(options) {
		var o, defaults = {action:'load',doSubmit:true}; var o = $.extend(defaults, options);
		if ( o.action == 'submit' ) {
			return this.each(function() {
				var objFrm = $(this); objFrm.data('errors', 0); objFrm.data('valid', false);
				$("span[id^='msg_'], span.yErrMsg", objFrm).empty();
				$('label', objFrm).each(function() {
					if( $(this, objFrm).is(':visible') || $(this, objFrm).attr('data-validate') ) {
						YS.validator.validate($(this), objFrm);
					}
				});
				if ( objFrm.data('errors') > 0 ) objFrm.data('valid', false);
				else objFrm.data('valid', true);
				$('span.yErrMsg:not(:empty):first', objFrm).prevAll(':input').focus();
			});
		} else if ( o.action == 'load' ) {
			return this.each(function() {
				var objFrm = $(this);
				if ( o.doSubmit ) {
					objFrm.bind('submit', function(e) {
						objFrm.validator({action:'submit'});
						if ( !objFrm.data('valid') ) { return false; }
					});
				}
				yErr = eval("("+objFrm.attr('rel')+")");
				//yErr = eval('({'+objFrm.attr('rel').replace(/\(|\)/g, '')+'})');
				if ( yErr != null ) {
					YS.validator.assignErrorMsg(yErr, objFrm);
				}
				$('label', objFrm).each(function() {
					if( $(this, objFrm).is(':visible') || $(this, objFrm).attr('data-validate') ) {
						var	elt	= $(this); var fldName	=	elt.attr('for'); var frmElement = $(this, objFrm);
						var objFld	=	$('input[name="'+fldName+'"],select[name="'+fldName+'"],textarea[name="'+fldName+'"]', objFrm);
						objFld.bind('blur', function(e) {
							YS.validator.validate(elt, objFrm);
						});
					}
				});
			});
		}
	},
	enable: function() {
		return this.each(function() {
			if (typeof this.disabled != "undefined") this.disabled = true;
		});
	},
	disable: function() {
		return this.each(function() {
			if (typeof this.disabled != "undefined") this.disabled = false;
		});
	}
});
//------------------------------------------------------------------------------
//YAWA Script!
var YS = YS ? YS : function() {
	var private = {
		property1: '',
		method1: function() {
		}
	};
	var public = {
		tpl_root: '/views/main',
		objYS: this,
		validateForm: function(form) {
			$(form).validator({action:'submit'});
			if ( !$(form).data('valid') ) { return false; }
			return true;
		},
		validator: {
			assignErrorMsg: function(error_msg, jobjForm) {
				if ( error_msg == null ) return;
				for (x in error_msg) {
					var elt = $('label[for|="'+x+'"]', jobjForm);
					var chk	=	eval('({'+elt.attr('rel').replace(/\(|\)/g, '')+'})');
					var fldName	=	elt.attr('for');
					var objFld	=	$('input[name="'+fldName+'"],select[name="'+fldName+'"],textarea[name="'+fldName+'"]', jobjForm);
					this.updateErrors(chk, fldName, jobjForm, objFld, error_msg[x]);
				}
			},
			clearError: function(fldName, objFrm, objFld) {
				var name = fldName.replace(/(\[|\])/g, '');
				var msgSpan = $("#msg_"+name, objFrm);
				var objErrElt = (msgSpan.attr('id') != undefined) ? msgSpan : objFld.parent().find('span.yErrMsg:last');
				objErrElt.html('');
			},
			updateErrors: function(chk, fldName, objFrm, objFld, msg) {
				var name = fldName.replace(/(\[|\])/g, '');
				var msgSpan = $("#msg_"+name, objFrm);
				objFld.addClass('b1');
				var objErrElt = (msgSpan.attr('id') != undefined) ? msgSpan : objFld.parent().find('span.yErrMsg:last');
				objErrElt.html(chk.err ? chk.err : msg).addClass('yErrMsg');
				return objFrm.data('errors', (objFrm.data('errors')+1));
			},
			validate: function(elt, objFrm) {
				if ( elt.attr('rel') == undefined || elt.attr('rel') == '' )
					return false;
				var chk	=	eval('({'+elt.attr('rel').replace(/\(|\)/g, '')+'})');
				//var tagName	=	elt.get(0).tagName.toLowerCase();
				var fldName	=	elt.attr('for');
				var objFld	=	$('input[name="'+fldName+'"],select[name="'+fldName+'"],textarea[name="'+fldName+'"]', objFrm);
				objFld.removeClass('b1');
				var fldTag	=	objFld.get(0).tagName.toLowerCase();
				var fldType =	objFld.attr('type').toLowerCase();

				//alert(JSON.stringify(objFld.attr('type')));
				if ( fldType != 'select-multiple' )
					var fldData	=	objFld.val();

				//alert(fldType);
				//alert(fldName);
				//alert(fldData);

				if ( chk.type == 'tmce' )
					var fldData	=	tinyMCE.get(fldName).getContent();

				if(chk.defaultValue != undefined && fldData == chk.defaultValue) {
					return this.updateErrors(chk, fldName, objFrm, objFld, chk.fld+' can not be empty');
				} else if(chk.req == 'Yes' && YS.isEmpty(fldData) && fldType != 'radio' && fldType != 'checkbox' && fldType != 'select-multiple') {
					return this.updateErrors(chk, fldName, objFrm, objFld, chk.fld+' can not be empty');
				} else if(chk.req == 'Yes' && fldType == 'radio') {
					var rValue	=	$("input[name='"+fldName+"']:checked", objFrm).val();
					if ( rValue == undefined ) return this.updateErrors(chk, fldName, objFrm, objFld, chk.fld+' can not be empty');
				} else if(chk.req == 'Yes' && fldType == 'checkbox') {
					var chkd = $('input[name="'+fldName+'"]:checked', objFrm).length;
					if ( chkd == 0 ) return this.updateErrors(chk, fldName, objFrm, objFld, 'Please check atleast one item for '+chk.fld);
				} else if(chk.req == 'Yes' && fldType == 'select-multiple') {
					var chkd	=	$("select[name='"+fldName+"'] option:selected", objFrm).length;
					if ( chkd == 0 ) return this.updateErrors(chk, fldName, objFrm, objFld, 'Please check atleast one item for '+chk.fld);
				}
				if(chk.type != undefined) {
					if((fldType == 'text' || fldType == 'password' || fldType == 'textarea') && !YS.isEmpty(fldData)) {
						if(chk.type == 'uname' && !YS.isUserName(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only alphabets allowed for '+chk.fld);
						}
						if(chk.type == 'alpha' && !YS.isAlpha(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only alphabets allowed for '+chk.fld);
						}
						if(chk.type == 'alpha1' && !YS.isAlpha1(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only alphabets with spaces allowed for '+chk.fld);
						}
						if(chk.type == 'alnum' && !YS.isAlphaNumeric(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only alphabets and numbers are allowed for '+chk.fld);
						}
						if(chk.type == 'email' && !YS.isEmail(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Invalid characters on '+chk.fld);
						}
						if(chk.type == 'int' && !YS.isNumeric(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only numbers allowed for '+chk.fld);
						}
						if(chk.type == 'float' && !YS.isFloat(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Only numbers allowed for '+chk.fld);
						}
						if(chk.type == 'zip' && !YS.isZip(fldData, chk.exact)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Invalid '+chk.fld);
						}
						if(chk.type == 'phone' && !YS.isPhone(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Invalid characters on '+chk.fld);
						}
						if(chk.type == 'amount' && !YS.isAmount(fldData)) {
							return this.updateErrors(chk, fldName, objFrm, objFld, 'Invalid characters on '+chk.fld);
						}
						if(chk.type == 'captcha') {
							var valid = YS.validateCaptcha('/raw/captcha/?act=validate', 'ccode');
							//if ( valid == "true" ) { return true; }
							//else { alert("Invalid verification code"); form.ccode.focus(); return false; }
							if ( valid != "true" )
								return this.updateErrors(chk, fldName, objFrm, objFld, 'Invalid verification code '+chk.fld);
						}
					}
				}
				if(chk.min != undefined) {
					if((fldType == 'text' || fldType == 'password' || fldType == 'textarea') && fldData.length < chk.min  && !YS.isEmpty(fldData)) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Minimum '+chk.min+' characters required for '+chk.fld);
					} else if((fldType == 'select-multiple' || fldType == 'checkbox') && chkd < chk.min) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Please choose at least '+chk.min+' items for '+chk.fld);
					}
				}
				if(chk.max != undefined) {
					if((fldType == 'text' || fldType == 'password' || fldType == 'textarea') && fldData.length > chk.max  && !YS.isEmpty(fldData)) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Maximum '+chk.max+' characters only allowed for '+chk.fld);
					} else if((fldType == 'select-multiple' || fldType == 'checkbox') && chkd > chk.max) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'You can choose maximum '+chk.max+' items for '+chk.fld);
					}
				}
				if(chk.exact != undefined) {
					if((fldType == 'text' || fldType == 'password' || fldType == 'textarea') && fldData.length != chk.exact  && !YS.isEmpty(fldData)) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Require exactly '+chk.exact+' characters for '+chk.fld);
					} else if((fldType == 'select-multiple' || fldType == 'checkbox') && chkd != chk.exact) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Please choose '+chk.exact+' items for '+chk.fld);
					}
				}
				if(chk.matchPassFld != undefined) {
					var fldName1	=	chk.matchPassFld;
					var objFld1	=	$('input[name="'+fldName1+'"],select[name="'+fldName1+'"],textarea[name="'+fldName1+'"]', objFrm);
					if((fldType == 'text' || fldType == 'password' || fldType == 'textarea') && fldData !== objFld1.val()  && !YS.isEmpty(fldData)) {
						return this.updateErrors(chk, fldName, objFrm, objFld, 'Passwords you have entered do not match');
					}
				}
				this.clearError(fldName, objFrm, objFld);
			}
		},
		paging: function(url, page, totalPages) {
			if(!this.isNumeric(page.value)) {
				alert('Invalid page no'); page.focus(); return false;
			}
			pageNo = $.trim(page.value);
			if(pageNo > totalPages || pageNo < 1) {
				alert('Invalid Page'); page.focus(); return false;
			}
			this.goTo(url+pageNo);
			return false;
		},
		loadPage: function(url, divID, blockUI) {
			if ( !blockUI && blockUI != undefined ) {
				$("#"+divID).load(url);
				return false;
			}
			$("#"+divID).blockUI({msg:"<img src=\""+this.tpl_root+"/images/loader3.gif\">"}).load(url);
			//$("#"+divID).blockUI().load(url, function() {$("#"+divID).unblockUI();});
			return false;
		},
		overlay: function(mode) {
			if(mode == "block") { $('select').hide(); $('#ys_overlay').show(); }
			else { $('select').show(); $('#ys_overlay').hide(); }
		},
		goBack: function(url) {
			if( url == undefined )
				history.go(-1);
			else
				window.location	= url;
		},
		goTo: function(url, top) {
			if ( top == undefined )
				window.location	=	url;
			else if ( top == true )
				window.top.location = url;
		},
		delAlert: function(url, msg) {
			msg = msg ? msg : 'Are you sure to delete?';
			if ( confirm(msg) ) {
				this.goTo(url);
			} else {
				return false;
			}
		},
		//getURL(hash|host|hostname|href|pathname|port|protocol|search|uri)
		getURL: function(what) {
			url = document.location;
			if ( what != undefined && what != 'uri' )
				return eval('document.location.'+what);
			else if ( what == 'uri' )
				return (url.pathname + url.search);
			else
				return document.location;
		},
		getParam: function(key) {
			var strQS = unescape(document.location.search);
			var re = new RegExp('('+key+'=){1}[^&]*', 'ig');
			x = strQS.match(re);
			if ( x != null ) { y = x.toString().split('='); return y[1]; }
			return x;
		},
		popUp: function(url, win_name, width, height, resize, scroll, top, left) {
			popWin = window.open(url, win_name, "toolbar=no, location=no, directories=no, status=no, menubar=no, resizable="+(!resize ? "yes" : resize)+", copyhistory=no, scrollbars="+(!scroll ? "yes" : scroll)+", width="+(!width ? "400" : width)+", height="+(!height ? "300" : height)+", top="+(!top ? "50" : top)+", left="+(!left ? "50" : left));
			popWin.focus();
		},
		openTarget: function(form, windowName, width, height, resize, scroll, top, left) {
			form.target = windowName;
			this.popUp('', windowName, width, height, resize, scroll, top, left);
		},
		//random bet'n 0 and x
		random: function(x) {
			return Math.floor(x * (Math.random() % 1));
		},
		randomBetween: function(minV, maxV) {
		  return minV + this.random(maxV - minV + 1);
		},
		shuffle: function(arr) {
			for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			return arr;
		},
		round: function(number, x) {
			x = (!x ? 2 : x);
			return Math.round(number*Math.pow(10,x))/Math.pow(10,x);
		},
		isEmpty: function(input) {
			data =	$.trim(input);
			if ( data.length > 0 ) { return false; }
			return true;
		},
		isAlpha: function(input) {
			return	/^[a-zA-Z]+$/.test(input);
		},
		isAlpha1: function(input) {
			return	/^[a-zA-Z ]+$/.test(input);
		},
		isNumeric: function(input) {
			return	/^[0-9]+$/.test(input);
		},
		isAlphaNumeric: function(input) {
			return	/^[a-zA-Z0-9 ]+$/.test(input);
		},
		isUserName: function(input) {
			return	/^[a-zA-Z0-9\.\-_]+$/.test(input);
		},
		isPhone: function(input) {
			return	/^[0-9\-()+ ]+$/.test(input);
		},
		isEmail: function(input) {
			return	/^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,4}(\.[a-z]{2}){0,2})$/i.test(input);
		},
		isAmount: function(input) {
			return	/^[0-9]+(.){0,1}([0-9]*)$/i.test(input);
		},
		isPositiveInt: function(input) {
			if(parseInt(input)>0) {	return true; }
			return false;
		},
		isPositiveFloat: function(input) {
			return this.isNotNegativeFloat(input) && (parseFloat(input)>0);
		},
		isNotNegativeFloat: function(input) {
			return /^[0-9]*[.]{0,1}[0-9]*$/.test(input);
		},
		isNotNegativeInt: function(input) {
			return /^[0-9]*$/.test(input);
		},
		isZip: function(input, noOfChars) {
			patZip	=	eval("/^[0-9]{"+noOfChars+"}$/");
			return patZip.test(input);
		},
		isPeriod: function(input) {
			return /^[1-9][0-9]{2}$/.test(input);
		},
		isFloat: function(input) {
			return /^[\-\+]{0,1}[0-9]*[.]{0,1}[0-9]*$/.test(input);
		},
		isInt: function(input) {
			i = parseInt(input);
			if(i>0 ||i==0 || i<0) { return true; }
			return false;
		},
		isSpace: function(input) {
			return /^[ ]+$/.test(input);
		},
		itemsChecked: function(objElt) {
			alert(objElt);
			var a = 0; var x = objElt.length;
			for(var i=0; i<x; i++) {
				if(objElt[i].checked) { a++; }
			}
			return a;
		},
		itemSelected: function(objElt) {
			var objSI = objElt.options.selectedIndex;
			if(objSI == 0 || objSI == -1)
				return false;
			return true;
		},
		itemsSelected: function(objElt) {
			var a = 0; var x = objElt.length;
			for(var i=0; i<x; i++) {
			  if(objElt.options[i].selected) { a++; }
			}
			return a;
		},
		itemSelectedData: function(objElt, mode) {
			return (mode == "value") ? objElt.value : objElt.options[objElt.selectedIndex].text;
		},
		radioValue: function(objElt) {
			var x = null; var n = objElt.length;
			for(var i=0; i<n; i++) {
				if (objElt[i].checked) { x = objElt[i].value; break; }
			}
			return x;
		},
		checkAll: function(chk, objElt) {
			var n = objElt.length;
			for(i=0; i<n; i++)
				objElt[i].checked = chk.checked;
		},
		transfer: function(fromId, toId, srcSelected) {
			!$('#'+fromId+' option:selected').remove().appendTo($('#'+toId));
			if ( srcSelected != undefined ) {
				$('#'+fromId).children('option').attr('selected', true);
			}
			return true;
		},
		moveUp: function(eltId) {
			var oSel = $('#'+eltId);
			if(oSel.attr('selectedIndex') != -1) {
				$('option:selected', oSel).each(function(){$(this).insertBefore($(this).prev());});
				oSel.children('option').attr('selected', true);
			}
			else
				alert("Please select an item"); oSel.focus();
		},
		moveDown: function(eltId) {
			var oSel = $('#'+eltId);
			if(oSel.attr('selectedIndex') != -1) {
				var eleValue = $('option:selected:last', oSel).next();
				$('option:selected', oSel).each(function() {
					$(this).insertAfter(eleValue);
					eleValue = $(eleValue).next();
				});
				oSel.children('option').attr('selected', true);
			}
			else
				alert("Please select an item"); oSel.focus();
		},
		updateDDwithJSON: function(objData, ddId, defTxt) {
			$('#'+ddId).children('option').remove();
			objDD = $('#'+ddId).get(0).options;
			if( defTxt != false )
				objDD[0] = new Option(defTxt ? defTxt : 'Select', '');
			$.each(objData, function(index, item) {
				//objDD[objDD.length] = new Option(item.name, index);
				objDD[objDD.length] = new Option(item.name, (item.val == undefined) ? index : item.val);
			});
		},
		populateDD: function(url, srcDD, destDD) {
			if ( srcDD == '' || srcDD == undefined || srcDD == null )
				var xUrl	=	url;
			else
			{
				qdata	=	escape($('select#'+srcDD).val());
				var xUrl	=	(url.indexOf('?') == -1) ? url+'?qd='+qdata : url+'&qd='+qdata;
				if ( qdata == null || qdata == '' )
					$('select#'+destDD).html('');
			}
			$.getJSON(xUrl, function(j) {
				var n = j.length;
				if ( $('select#'+destDD).attr('multiple') )
					var optx = '<option value="0">All</option>';
				else
					var optx = '<option value="">Select</option>';
				for (var i = 0; i < n; i++) {
					optx += '<option value="' + j[i].ov + '">' + j[i].od + '</option>';
				}
				$('select#'+destDD).html(optx);
				//$("option:first", "select#"+destDD).attr("selected","selected");
				//$("select#"+destDD+" option:first").attr('selected', 'selected');
				//$("select#"+destDD).attr("value","1");
			})
		},
		validateCaptcha: function(chkUrl, cCode) {
			qdata	=	$('#'+cCode).val();
			return	$.ajax({ type: 'GET', url: chkUrl, data: 'qd='+qdata, cache: false, async: false}).responseText;
		},
		formatMoney: function(amount) {
			var i = parseFloat(amount);
			if(isNaN(i)) { i = 0.00; }
			var minus = '';
			if(i < 0) { minus = '-'; }
			i = Math.abs(i);
			i = parseInt((i + .005) * 100);
			i = i / 100;
			s = new String(i);
			if(s.indexOf('.') < 0) { s += '.00'; }
			if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
			s = minus + s;
			return s;
		},
		setCookie: function(cookieName, cookieValue, lifeTime, path, domain, isSecure) {
			if ( !cookieName ) { return false; }
			life_time	=	lifeTime * 24 * 60 * 60 * 1000;
			document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + (lifeTime ? ";expires=" + ( new Date( ( new Date() ).getTime() + (life_time) )).toGMTString() : "") + (path ? ";path=" + path : "/") + (domain ? ";domain=" + domain : '.'+YS.getURL('hostname')) + (isSecure ? ";secure" : "");
		},
		getCookie: function(cookieName) {
			var cookieJar = document.cookie.split("; ");
			for(var x = 0; x < cookieJar.length; x++) {
				var arrCookie = cookieJar[x].split("=");
				if(arrCookie[0].toString() == decodeURIComponent(cookieName) ) { return decodeURIComponent(arrCookie[1]); }
			}
			return null;
		},
		//var prelod = ['image1.gif', 'image2.gif']; //$.preloadImages(preload); //$.preloadImages('image1.gif', 'image2.gif');
		preloadImages: function() {
			var a = (typeof arguments[0] == 'object') ? arguments[0] : arguments;
			var n = a.length-1;
			var cImg = new Image();
			for(var i=0; i<n; i++) {
				cImg.src = a[i];
			}
		},
		jqPngFix: function() {
			try {
				//ie6 png transperency fix
				$.each($("img[src$=.png],img[src$=.PNG]"), function () {
					var img = $(this);
					img.css({"width": img.width(),"height": img.height(), "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.attr("src") + "', sizingMethod='scale')"});
					img.attr("src", this.tpl_root+"/images/transparent.gif");
				});
			} catch(e) {
				alert(e.description)
			}
		},
		navHover: function() {
			$("#navmenu li").hover(
				function() { $(this).addClass('iehover'); },
				function() { $(this).removeClass('iehover'); }
			);
		},
		preFill: function(e, str) {
			var obj = ($.browser.msie) ? e.srcElement : e.target;
			if ( e.type == 'blur' && obj.value == '' ) obj.value = str;
			else if ( e.type == 'focus' && obj.value == str ) obj.value = '';
		},
		setNoImage:function(){
			$('img').one('error', function (e) {
				if( $(this).attr('data-noimage') )
				{
					$(this).unbind('error').attr('src', $(this).attr('data-noimage'));
				}
			});
		}
	}
	return public;
} ();
//------------------------------------------------------------------------------
if ( $.browser.msie && parseInt($.browser.version) <= 6 ) {
	//if (window.attachEvent) window.attachEvent("onload", YS.navHover);
}

if ( $.browser.msie && parseInt($.browser.version) <= 6 ) {
	//if (window.attachEvent) window.attachEvent("onload", YS.jqPngFix);
}

$(document).ready(function() {
	$(".yForm").validator({action:'load'});
});
