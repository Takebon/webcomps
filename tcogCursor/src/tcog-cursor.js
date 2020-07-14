import Template from './template.js'
import Follower from './follower.js'

export default class Cursor extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })		
	}
	connectedCallback() {
		if (this.hasAttribute('size')) {
			this.size = this.getAttribute('size')
		} else {
			this.size = 80
		}
		if (this.hasAttribute('fill-color')) {
			this.fillColor = this.getAttribute('fill-color')
		} else {
			this.fillColor = '#ccc'
		}
		if (this.hasAttribute('stroke-color')) {
			this.strokeColor = this.getAttribute('stroke-color')
		} else {
			this.strokeColor = this.fillColor
		}
		if (this.hasAttribute('opacity')) {
			this.opacity = this.getAttribute('opacity')
		} else {
			this.opacity = '.8'
		}
		if (this.hasAttribute('stroke-width')) {
			this.strokeWidth = this.getAttribute('stroke-width')
		} else {
			this.strokeWidth = '2'
		}
		if (this.hasAttribute('drag')) {
			this.drag = this.getAttribute('drag')
		} else {
			this.drag = '.2'
		}
		this.shadowRoot.innerHTML = Template.render(
			this.size,
			this.fillColor,
			this.strokeColor,
			this.opacity,
			this.strokeWidth
		)
		this.dom = Template.mapDOM(this.shadowRoot);
    const cursor = new Follower(this, this.drag)
	}
}

if (!customElements.get('tcog-cursor')) {
	customElements.define('tcog-cursor', Cursor)
}
