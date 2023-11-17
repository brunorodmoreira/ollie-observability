const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals')

/**
 * @type {import('esbuild').BuildOptions}
 */
const sharedConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    target: ['esnext'],
    plugins: [nodeExternalsPlugin()],
}

build({
    ...sharedConfig,
    outfile: 'dist/index.js',
    format: 'cjs',
}).catch(() => process.exit(1));

build({
    ...sharedConfig,
    outfile: 'dist/index.esm.js',
    format: 'esm',
}).catch(() => process.exit(1));