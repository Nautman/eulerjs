var Euler = {
	drawGrid: function (ctx, color, rows, columns) {
		ctx.strokeStyle = color
		var row = ctx.height/rows
		var column = ctx.width/columns
		for (var y = 0; y <= ctx.height; y += row) {
			for (var x = 0; x <= ctx.width; x += column) {
				ctx.rect(x + ctx.offsetX, y + ctx.offsetY, column, row)
				ctx.stroke()
			}
		}
	},
	drawCircle: function (ctx, circle) {
		ctx.beginPath()
		ctx.strokeStyle = circle.color
		ctx.lineWidth = circle.lineWidth
		ctx.arc(circle.x + ctx.offsetX, circle.y + ctx.offsetX, circle.radius, 0, 2 * Math.PI)
		ctx.stroke()
	},
	degreeToRadian: function (degree) {
		return degree*Math.PI/180;
	},
	drawLine: function(ctx, color, start, end) {
		ctx.beginPath()
		ctx.moveTo(start.x + ctx.offsetX, start.y + ctx.offsetY)
		ctx.lineTo(end.x + ctx.offsetX, end.y + ctx.offsetY)
		ctx.strokeStyle = color
		ctx.stroke()
		ctx.closePath()	
	},
	drawArc: function (ctx, angle, arc, text) {
		ctx.beginPath()
		ctx.strokeStyle = arc.strokeStyle
		ctx.lineWidth = arc.lineWidth
		ctx.arc(arc.x + ctx.offsetX, arc.y + ctx.offsetY, arc.radius, 0, Euler.degreeToRadian(-angle), true)
		ctx.lineTo(arc.x + ctx.offsetX, arc.y + ctx.offsetY)
		ctx.lineTo(arc.x + ctx.offsetX + arc.radius, arc.y + ctx.offsetY)
		ctx.stroke()
		ctx.fillStyle = arc.fillStyle
		ctx.fill()
		ctx.closePath()
		if(text) {
			ctx.fillStyle = text.color
			ctx.fillText(text.text, Math.cos(Euler.degreeToRadian(-angle/2))*arc.radius/2 + arc.x + ctx.offsetX, Math.sin(Euler.degreeToRadian(-angle/2))*arc.radius/2 + arc.y + ctx.offsetY)
		}
	},
	drawTanLine: function(ctx, angle, circle, color) {
		ctx.beginPath()
		ctx.moveTo(Math.cos(Euler.degreeToRadian(-angle))*circle.radius + circle.x + ctx.offsetX, Math.sin(Euler.degreeToRadian(-angle))*circle.radius + circle.y + ctx.offsetY)
		ctx.lineTo(circle.radius/(Math.cos(Euler.degreeToRadian(-angle))) + circle.x + ctx.offsetX, circle.y + ctx.offsetY)
		ctx.strokeStyle = color
		ctx.stroke()
		ctx.closePath()
	},
	drawSinAndCos: function (ctx, angle, circle, sinColor, cosColor) {
		ctx.beginPath()
		ctx.moveTo(Math.cos(Euler.degreeToRadian(-angle))*circle.radius + circle.x + ctx.offsetX, Math.sin(Euler.degreeToRadian(-angle))*circle.radius + circle.y + ctx.offsetY)
		ctx.lineTo(Math.cos(Euler.degreeToRadian(-angle))*circle.radius + circle.x + ctx.offsetX, circle.y + ctx.offsetY)
		ctx.strokeStyle = sinColor
		ctx.stroke()
		ctx.closePath()
		ctx.beginPath()
		ctx.moveTo(Math.cos(Euler.degreeToRadian(-angle))*circle.radius + circle.x + ctx.offsetX, circle.y + ctx.offsetY)
		ctx.lineTo(circle.x + ctx.offsetX, circle.y + ctx.offsetY)
		ctx.strokeStyle = cosColor
		ctx.stroke()
		ctx.closePath()
	}
}