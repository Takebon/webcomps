;(function (window) {
	this.TC_GLU = {
		Texture: class Texture {
			constructor(gl, image, n, filter = 'LINEAR', wrapMode = 'REPEAT') {
				this.gl = gl
				this.n = n
				this.texture = gl.createTexture()
				gl.bindTexture(gl.TEXTURE_2D, this.texture)
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapMode])
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapMode])
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[filter])
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[filter])
				gl.activeTexture(gl.TEXTURE0 + n)
				gl.bindTexture(gl.TEXTURE_2D, this.texture)
			}
		},
		Framebuffer: class Framebuffer {
			constructor(gl, n, type, w, h = w, filter = 'LINEAR') {
				this.gl = gl
				this.type = type
				this.n = n
				this.w = w
				this.h = h
				this.width = w
				this.height = h
				this.fb0 = gl.createFramebuffer()
				this.renderbuffer = gl.createRenderbuffer()
				this.texture = gl.createTexture()
				gl.activeTexture(gl['TEXTURE' + this.n])
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb0)
				gl.bindTexture(gl.TEXTURE_2D, this.texture)
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[filter])
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[filter])
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, this.type, null)
				gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer)
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h)
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0)
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer)
			}
			read() {
				this.route()
				var pixels = new Float32Array(this.w * this.h * 4)
				this.gl.readPixels(0, 0, this.w, this.h, this.gl.RGBA, this.type, pixels)
				return pixels
			}
			write(typedArray) {
				this.gl.activeTexture(this.gl['TEXTURE' + this.n])
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.w, this.h, 0, this.gl.RGBA, this.type, typedArray)
			}
			source(element) {
				this.gl.activeTexture(this.gl['TEXTURE' + this.n])
				this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, element)
				this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false)
			}
			route() {
				this.gl.activeTexture(this.gl['TEXTURE' + this.n])
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
				this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb0)
				this.gl.viewport(0, 0, this.w, this.h)
			}
		},
		createProgram: (gl, vstr, fstr) => {
			vstr = vstr.length < 20 && document.getElementById(vstr) ? document.getElementById(vstr).textContent : vstr
			fstr = fstr.length < 20 && document.getElementById(fstr) ? document.getElementById(fstr).textContent : fstr

			let program = gl.createProgram()	
			let vshader = this.TC_GLU.createShader(gl, vstr, gl.VERTEX_SHADER)
			let fshader = this.TC_GLU.createShader(gl, fstr, gl.FRAGMENT_SHADER)

			gl.attachShader(program, vshader)
			gl.attachShader(program, fshader)
			gl.linkProgram(program)

			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				throw gl.getProgramInfoLog(program)
			}
			return program
		},
		createShader: (gl, str, type) => {
			let shader = gl.createShader(type)
			gl.shaderSource(shader, str)
			gl.compileShader(shader)

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				var errorString = gl.getShaderInfoLog(shader)
				alert(errorString + str.split('\n')[errorString.split(':')[2] - 1])
				throw gl.getShaderInfoLog(shader)
			}

			return shader
		},
		initAttrib: (gl, program) => {
			gl.useProgram(program)
			const positionLocation = gl.getAttribLocation(program, 'a_position')
			gl.enableVertexAttribArray(positionLocation)
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, gl.FALSE, 0, 0)
		},
		setUni: (gl, program, name, args, int = false) => {    
			gl.useProgram(program)
			if (!program[name]) program[name] = gl.getUniformLocation(program, name)
			if (int || typeof args == 'boolean') gl.uniform1i(program[name], args)
			else if (args.constructor == Array) gl['uniform' + args.length + 'fv'](program[name], args)
			else if (typeof args == 'number') gl.uniform1f(program[name], args)
			else if (args instanceof this.TC_GLU.Framebuffer) gl.uniform1i(program[name], args.n)
		},
		draw: (gl, program, dest, clear = false, type = gl.TRIANGLE_STRIP, a = 0, b = 4) => {
			gl.useProgram(program)
			if (dest.route == undefined) {
				gl.bindFramebuffer(gl.FRAMEBUFFER, null)
				gl.viewport(0, 0, dest.width, dest.height)
			} else dest.route()
			if (clear) gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			gl.drawArrays(type, a, b)
		},
		initVerts: (gl, w = 0, h = w) => {
			const buffer = gl.createBuffer()
			const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
			gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
		},
		getType: () => {
			let type, ext
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				ext = gl.getExtension('OES_texture_half_float')
				type = ext.HALF_FLOAT_OES
			} else {
				ext = gl.getExtension('OES_texture_float')
				type = gl.FLOAT
			}
			return type
		}
	}
})(this)
