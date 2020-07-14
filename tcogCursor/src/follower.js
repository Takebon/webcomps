import { lerp, getMousePos } from './utils.js'

let mouse = { x: 0, y: 0 }
window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)))

export default class Follower {
	constructor(el, drag) {
		this.DOM = { el: el }
		this.bounds = this.DOM.el.getBoundingClientRect();		
		this.renderedStyles = {
			tx: { previous: 0, current: 0, amt: drag},
			ty: { previous: 0, current: 0, amt: drag },
		}
		this.onMouseMoveEv = () => {     
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current = (mouse.x - this.bounds.width/ 2 ) - this.bounds.x
      this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = (mouse.y - this.bounds.height/ 2) - this.bounds.y      
			this.DOM.el.dom.wrapper.style.opacity = "1"
			requestAnimationFrame(() => this.render())
			window.removeEventListener('mousemove', this.onMouseMoveEv)
		}
		window.addEventListener('mousemove', this.onMouseMoveEv)
  }
  render() {
    this.renderedStyles['tx'].current = (mouse.x - this.bounds.width/ 2) - this.bounds.x
    this.renderedStyles['ty'].current = (mouse.y - this.bounds.height/ 2) - this.bounds.y
    
    for (const key in this.renderedStyles ) {
        this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
    }
                
    this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
    
    requestAnimationFrame(() => this.render());
}
}
