// Import the filesystem module
const fs = require('fs');

const action = process.argv.length > 2 && process.argv[2];

const linkEntries = [
    ['../examples/pages/index.js',  './pages/index.js'],
    ['../examples/pages/about.js',  './pages/about.js'],
    ['../examples/pages/docs.js',   './pages/docs.js'],
    ['../../examples/api/frontpage-data', './pages/api/frontpage-data'],
    ['../examples/pages/gator',     './pages/gator'],
    ['../examples/public/gator',    './public/gator'],
    ['../examples/pages/aladin',    './pages/aladin']
];


if (!action || action === 'init') {
    linkEntries.forEach(item => {
        const target = item[0];
        const path = item[1];
        fs.symlink(target,
            path, 'dir', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log('Symlink created: ' + path);
                }
            }
        );
    });
} else if (action === 'clean') {
    linkEntries.forEach(item => {
        const path = item[1];
        fs.unlink(path, (err) => {
            if (err) throw err;
            console.log(path + ' removed');
        });
    });
} else {
    console.log('Usage:  npm run examples [init|clean]  \n        : defautls to init if not specify');
}


