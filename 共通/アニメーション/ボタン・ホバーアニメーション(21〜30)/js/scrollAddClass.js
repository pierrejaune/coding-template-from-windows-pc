// JavaScript Document

/*
 * スクロールで指定要素に到達したときクラスを追加
 */
(function( $ ){

	$.fn.scrollAddClass = function( options ) {

		var defaults = $.extend( {
		  selector : '.target',
		  offset : -200,
		  removeAction : false,
		  trigger : "",
			class : 'active'
		}, options);

		return this.each(function() {

			var self = $(this);

			$(window).load(function(){
				addAction(self);
			});

			$(window).scroll(function(){
				addAction(self);
			});

			$(window).resize(function(){
				addAction(self);
			});

		});


		function addAction(self){
			var target = self.find(defaults.selector);

			// 高さ
			var elmTop = self.offset().top;
			// スクロール
			var scrTop = $(window).scrollTop();
			// padding込みの高さ
			var elmHeight = self.outerHeight(true);
			// ブラウザ画面の高さ
			var windowHeight = $(window).height();
			// 画面の底の境界
			var bottomLine = scrTop + windowHeight;


			//  画面の一番下のライン = スクロール量 + ウィンドウの高さ
			//  画面の一番下のラインが各sectionのトップに到達したらactionを付ける

			if (bottomLine + defaults.offset > elmTop && !self.hasClass('active')){
				self.addClass(defaults.class);
				self.trigger(defaults.trigger);
			}
			if (bottomLine + defaults.offset < elmTop && self.hasClass('active')){
				if( defaults.removeAction ){
					self.removeClass(defaults.class);
					self.trigger(defaults.trigger);
				}
			}

		};

	};

})( jQuery );
