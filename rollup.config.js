import { terser } from 'rollup-plugin-terser'

export default [
	{
		input: './tcogCursor/src/tcog-cursor.js',
		output: [{ file: './tcogCursor/tcog-cursor.js', name: 'TcogCursor', format: 'umd' }],
		plugins: [terser()],
	},	
]
