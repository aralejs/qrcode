define(function(require, exports, module) {
	var $ = require('$');
	var QRCodeAlg = require('./qrcodealg');

	/**
	 * 二维码构造函数，主要用于绘制
	 * @param  {参数列表} opt 传递参数
	 * @return {}     
	 */	
	var qrcode = function(opt) {
		if (typeof opt === 'string') { // 只编码ASCII字符串
			opt = {
				text: opt
			};
		}
		//设置默认参数
		this.options = $.extend({}, {
			width: 256,
			height: 256,
			correctLevel: 3,
			background: "#ffffff",
			foreground: "#000000"
		}, opt);
	};
	/**
	 * 使用Canvas来画二维码
	 * @return {} 
	 */
	qrcode.prototype.createCanvas = function() {
		//先使用ARCodeALg构造函数创建二维码
		var qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
		//创建canvas节点
		var canvas = document.createElement('canvas');
		canvas.width = this.options.width;
		canvas.height = this.options.height;
		var ctx = canvas.getContext('2d');

		//计算每个点的长宽
		var tileW = (this.options.width / qrCodeAlg.getModuleCount()).toPrecision(4);
		var tileH = this.options.height / qrCodeAlg.getModuleCount().toPrecision(4);

		//绘制
		for (var row = 0; row < qrCodeAlg.getModuleCount(); row++) {
			for (var col = 0; col < qrCodeAlg.getModuleCount(); col++) {
				ctx.fillStyle = qrCodeAlg.isDark(row, col) ? this.options.foreground : this.options.background;
				var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
				var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
				ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
			}
		}
		//返回绘制的节点
		return canvas;
	};

	/**
	 * 使用table来绘制二维码
	 * @return {} 
	 */
	qrcode.prototype.createTable = function() {
		//使用QRCodeAlg创建二维码结构
		var qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
		//创建table节点
		var $table = $('<table></table>').css({
			'border':'0px',
			'margin':'0px',
			'padding':'0px',
			"border-collapse":"collapse",
			'background-color': this.options.background
			})
		// 计算每个节点的长宽；取整，防止点之间出现分离
		var tileW = Math.floor(this.options.width / qrCodeAlg.getModuleCount());
		var tileH = Math.floor(this.options.height / qrCodeAlg.getModuleCount());

		// 绘制二维码
		for (var row = 0; row < qrCodeAlg.getModuleCount(); row++) {
			var $row = $('<tr></tr>').css({
				'border':'0px',
				'margin':'0px',
				'padding':'0px',
				'height': tileH + "px"
			}).appendTo($table);
			for (var col = 0; col < qrCodeAlg.getModuleCount(); col++) {
				$('<td></td>').css({
					'border':'0px',
					'margin':'0px',
					'padding':'0px',
					'width': tileW + "px",
					'background-color':qrCodeAlg.isDark(row, col) ? this.options.foreground : this.options.background
				}).appendTo($row);
			}
		}
		// 返回table节点
		return $table;
	};
	/**
	 * 使用SVG开绘制二维码
	 * @return {} 
	 */
	qrcode.prototype.createSVG = function() {
		//使用QRCodeAlg创建二维码结构 
		var qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
		//svg命名空间	
		var svgns = "http://www.w3.org/2000/svg";
		//创建SVG节点
		var $svg = $(document.createElementNS(svgns, 'svg:svg'))
			.attr('height', this.options.height).attr('width', this.options.width);

		//计算每个二维码矩阵中每个点的长宽
		var tileW = Math.floor(this.options.width / qrCodeAlg.getModuleCount());
		var tileH = Math.floor(this.options.height / qrCodeAlg.getModuleCount());

		//绘制二维码
		for (var row = 0; row < qrCodeAlg.getModuleCount(); row++) {			
			for (var col = 0; col < qrCodeAlg.getModuleCount(); col++) {
				$(document.createElementNS(svgns, 'svg:rect'))
					.attr('y',row*tileH).attr('x',col*tileW)
					.attr('width', tileW ).attr('height', tileH)
					.attr('fill', qrCodeAlg.isDark(row, col) ? this.options.foreground : this.options.background)
					.appendTo($svg);
			}
		}
		//返回svg节点
		return $svg;
	};

	module.exports = qrcode;
});