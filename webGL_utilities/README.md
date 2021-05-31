### WebGL helper functions.
## Usage
```js
<script src="https://cdn.jsdelivr.net/npm/tc_glu@latest/gl_utilities.js"></script>
```
index.html:
```js
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />        
		<script src="https://cdn.jsdelivr.net/npm/tc_glu@latest/gl_utilities.js"></script>
		<title>WebGl Shader Boilerplate</title>
		<style>
			*,
			*::after,
			*::before {
				box-sizing: border-box;
				padding: 0;
				margin: 0;
			}
			body {
				background-color: #373f36;
				overflow: hidden;
			}
			#gl {
				width: 100%;
				height: 100vh;
			}
		</style>
	</head>
	<body>
		<div id="gl"></div>
		<script type="module" src="./app.js"></script>
	</body>
</html>
```
app.js:
```js
import shaders from './shaders.js'

const container = document.querySelector('#gl')
const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
container.appendChild(canvas)

const gl = canvas.getContext('webgl2')
const program = TC_GLU.createProgram(gl, shaders.vertex(), shaders.fragment())

TC_GLU.setUni(gl, program, 'resolution', [canvas.width, canvas.height])
TC_GLU.setUni(gl, program, 'ratio', devicePixelRatio)
TC_GLU.initVerts(gl)
TC_GLU.initAttrib(gl, program)
TC_GLU.draw(gl, program, canvas)
```
shaders.js:
```js
export default{
  vertex(){
    return`#version 300 es
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    out vec2 vv;
    in vec2 a_position;
    
    void main(){
      vv=a_position;
      gl_Position=vec4(a_position*2.-1.,0,1);
    }
    `
  },
  fragment(){
    return`#version 300 es
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform vec2 resolution;
    uniform float ratio;
    out vec4 color;
    
    void main(){
      vec2 uv=2.*(ratio*gl_FragCoord.xy-.5*resolution.xy)/resolution.y;
      
      float c=smoothstep(.3,.29,length(uv));
      color=vec4(vec3(c),c);
    }`
  },
}

```
