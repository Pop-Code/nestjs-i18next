module.exports = {
    mode: 'modules',
    out: 'docs',
    exclude: ['**/test/**'],
    theme: 'default',
    name: 'Couriier Code Documentation',
    ignoreCompilerErrors: false,
    excludeExternals: true,
    excludePrivate: false,
    excludeNotExported: false,
    target: 'ES6',
    moduleResolution: 'node',
    preserveConstEnums: true,
    stripInternal: false,
    suppressExcessPropertyErrors: true,
    suppressImplicitAnyIndexErrors: true,
    module: 'commonjs',
    hideGenerator: true
};
