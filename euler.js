var Euler = {
	drawGrid: function (c, xWidth, yWidth, color, lineWidth, start, end) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c);
		var ctx = c.getContext('2d')
		ctx.strokeStyle = color ? color : 'grey'
		xWidth = xWidth ? xWidth : 10
		yWidth = yWidth ? yWidth : 10
		start = start ? start : {x: 0, y: 0}
		end = end ? end : {x: c.width, y: c.height}
		var restX = start.x % xWidth
		var restY = start.y % yWidth
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		for(var line = start.x + scene.offset.x; line <= end.x + scene.offset.x; line += xWidth) {
			ctx.beginPath()
			ctx.moveTo((line)*scene.zoom, (start.y + scene.offset.y)*scene.zoom)
			ctx.lineTo((line)*scene.zoom, (end.y + scene.offset.y)*scene.zoom)
			ctx.stroke()
			ctx.closePath()
		}
		for(var line = start.y + scene.offset.y; line <= end.y + scene.offset.y; line += yWidth) {
			ctx.beginPath()
			ctx.moveTo((start.x + scene.offset.x)*scene.zoom, (line)*scene.zoom)
			ctx.lineTo((end.x + scene.offset.x)*scene.zoom, (line)*scene.zoom)
			ctx.stroke()
			ctx.closePath()
		}
	},
	drawCircle: function (c, x, y, radius, lineWidth, color, fillStyle) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c);
		var ctx = c.getContext('2d')
		lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.beginPath()
		ctx.arc((x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom, radius*scene.zoom, 0, 2 * Math.PI)
		if(color || !fillStyle) {ctx.strokeStyle = color ? color : 'black'; ctx.stroke()}
		if(fillStyle) {ctx.fillStyle = fillStyle; ctx.fill()}
		ctx.closePath()
	},
	degreeToRadian: function (degree) {
		return degree*Math.PI/180;
	},
	drawLine: function(c, start, end, lineWidth, color) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.strokeStyle = color ? color : 'black'
		ctx.beginPath()
		ctx.moveTo((start.x + scene.offset.x)*scene.zoom, (start.y + scene.offset.y)*scene.zoom)
		ctx.lineTo((end.x + scene.offset.x)*scene.zoom, (end.y + scene.offset.y)*scene.zoom)
		ctx.stroke()
		ctx.closePath()	
	},
	drawArc: function (c, x, y, radius, angle, cc, lineWidth, color, fillStyle, text) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.strokeStyle = color ? color : 'black'
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		angle = scene.radians ? (cc ? -1 : 1)*angle : Euler.degreeToRadian(angle*(cc ? -1 : 1))
		ctx.beginPath()
		ctx.arc((x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom, radius*scene.zoom, 0, angle, cc)
		ctx.lineTo((x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom)
		ctx.lineTo((x + scene.offset.x + radius)*scene.zoom + ctx.lineWidth/2, (y + scene.offset.y)*scene.zoom)
		if(color || !fillStyle && (angle % (2*Math.PI)) !== 0) {
			ctx.stroke()
		}
		if(fillStyle) {ctx.fillStyle = fillStyle; ctx.fill()}
		ctx.closePath()
		if(text) {
			if(scene.reload.zoom) ctx.font = parseInt(ctx.font.substr(0, ctx.font.indexOf('px')))*scene.zoom + ctx.font.substr(ctx.font.indexOf('px'), ctx.font.length - 1)
			ctx.fillStyle = text.color ? text.color : 'black'
			ctx.fillText(text.text, (Math.cos(angle/2)*radius/2 + x + scene.offset.x)*scene.zoom, (Math.sin(angle/2)*radius/2 + y + scene.offset.y)*scene.zoom)
		}
	},
	drawShape: function(c, x, y, radius, sides, degree, lineWidth, color, fillStyle) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.strokeStyle = color ? color : 'black'
		var degreeAdd = 2*Math.PI/sides;
		degree = (degreeAdd - 2*degreeAdd*(((sides % 4) % 3) % 2))/(((sides % 2)*2 + 2)) - degree
		ctx.beginPath()
		ctx.moveTo((Math.cos(degree)*radius + x + scene.offset.x)*scene.zoom, (Math.sin(degree)*radius + y + scene.offset.y)*scene.zoom)
		for(var side = 1; side <= sides; side++ ) {
			ctx.lineTo((Math.cos(side*degreeAdd + degree)*radius + x + scene.offset.x)*scene.zoom, (Math.sin(side*degreeAdd + degree)*radius + y + scene.offset.y)*scene.zoom)
		}
		ctx.lineTo((Math.cos(0 + degree)*radius + x + scene.offset.x)*scene.zoom, (Math.sin(0 + degree)*radius + y + scene.offset.y)*scene.zoom)
		if(color || !fillStyle) ctx.stroke();
		if(fillStyle) {ctx.fillStyle = fillStyle; ctx.fill()}
		ctx.closePath()
	},
	drawTanLine: function(c, x, y, radius, angle, cc, lineWidth, color) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.strokeStyle = color ? color : 'black'
		angle = scene.radians ? (cc ? -1 : 1)*angle : Euler.degreeToRadian(angle*(cc ? -1 : 1))
		ctx.beginPath()
		ctx.moveTo((Math.cos(angle)*radius + x + scene.offset.x)*scene.zoom, (Math.sin(angle)*radius + y + scene.offset.y)*scene.zoom)
		ctx.lineTo((radius/Math.cos(angle) + x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom)
		ctx.stroke()
		ctx.closePath()
	},
	drawSinLine: function(c, x, y, radius, angle, cc, lineWidth, color) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.strokeStyle = color ? color : 'black'
		angle = scene.radians ? (cc ? -1 : 1)*angle : Euler.degreeToRadian(angle*(cc ? -1 : 1))
		ctx.beginPath()
		ctx.moveTo((Math.cos(angle)*radius + x + scene.offset.x)*scene.zoom, (Math.sin(angle)*radius + y + scene.offset.y)*scene.zoom)
		ctx.lineTo((Math.cos(angle)*radius + x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom)
		ctx.stroke()
		ctx.closePath()
	},
	drawCosLine: function(c, x, y, radius, angle, cc, lineWidth, color) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.scene(c), ctx = c.getContext('2d')
		ctx.lineWidth = lineWidth ? lineWidth*scene.zoom : 1
		ctx.strokeStyle = color ? color : 'black'
		angle = scene.radians ? (cc ? -1 : 1)*angle : Euler.degreeToRadian(angle*(cc ? -1 : 1))
		ctx.beginPath()
		ctx.moveTo((Math.cos(angle)*radius + x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom)
		ctx.lineTo((x + scene.offset.x)*scene.zoom, (y + scene.offset.y)*scene.zoom)
		ctx.stroke()
		ctx.closePath()
	},
	scene: function(c, properties) {
		var scene = Euler.canvases[c.id] ? Euler.canvases[c.id] : Euler.canvases[c.id] = {
			zoom: 1,
			offset: {x: 0, y: 0},
			ctx: {},
			radians: true,
			reload: {zoom: true}
		}
		if(properties) {
			for(var property in properties) {
				Euler.canvases[c.id][property] = properties[property]
			}
		}
		return Euler.canvases[c.id]
	},
	canvases: {}
}
