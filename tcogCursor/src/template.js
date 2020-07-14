export default {
	render(size, fillColor, strokeColor, opacity, strokeWidth) {
		return `${this.css(size, fillColor, strokeColor, opacity, strokeWidth)} ${this.html(size, strokeWidth)}`
	},
	mapDOM(scope) {
		return {
			wrapper: scope.getElementById('wrapper'),
			cursor: scope.getElementById('cursor')
		}
	},
	html(size, strokeWidth) {
		return `<div id="wrapper">
<svg id="cursor" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<circle class="cursor__inner" cx="${size/2}" cy="${size/2}" r="${(size/2)-strokeWidth}"/>
</svg>
</div>
`
  },
  css(size, fillColor, strokeColor, opacity, strokeWidth){
    return `
<style>
:host {
position: absolute;
width: ${size};
height: ${size};
}
#wrapper {
	padding:0;
margin:0;
opacity: 0;
transition: opacity 0.4s;
}
@media (any-pointer: fine) {
#cursor {		
position: fixed;
top: 0;
left: 0;
display: block;
pointer-events: none;	
}
.cursor__inner {
fill: ${fillColor};
stroke: ${strokeColor};
stroke-width: ${strokeWidth};
opacity: ${opacity};
}	
}
</style>
`}
}
