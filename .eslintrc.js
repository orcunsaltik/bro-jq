const packageJson     = require('./package.json');
const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
    'env': {
        browser: true,
            es6: true
    },
    'extends': [
        'airbnb-base'
    ],
    'parserOptions': {
        ecmaVersion: 2018,
         sourceType: 'module'
    },
    'rules': {
        'comma-dangle':         [2, 'never'],
        'import/no-unresolved': [2, {ignore: ['window']}],
        'no-cond-assign':       [2, 'except-parens'],
        'indent':               0,
        'no-continue':          0,
        'no-multi-spaces':      0,
        'no-nested-ternary':    0,
        'no-param-reassign':    0,
        'no-trailing-spaces':   0,
        'no-underscore-dangle': 0,
        'prefer-destructuring': 0,
        'no-bitwise':           0,
        'func-names':           0,
        'padded-blocks':        0,
        'prefer-rest-params':   0
    },
    'overrides': [{
            'files': 'lib/**',
            'extends': [
                'eslint:recommended',
                'plugin:node/recommended'
            ],
            'parserOptions': {
                'ecmaVersion': 2020
            },
            'rules': {
                'node/exports-style':               [2, 'module.exports'],
                'node/file-extension-in-import':    [2, 'always'],
                'node/prefer-global/buffer':        [2, 'always'],
                'node/prefer-global/console':       [2, 'always'],
                'node/prefer-global/process':       [2, 'always'],
                'node/no-unpublished-require':      [2, {'allowModules': devDependencies}],
                'node/no-extraneous-require':        0,
                'no-async-promise-executor':         0,
                'import/no-extraneous-dependencies': 0
            }
        }]
};
