// Import the filesystem module
const fs = require('fs');

const action = process.argv.length > 2 && process.argv[2];

const linkEntries = [
    ['/pages/index.js', './pages/index.js'],
    ['/pages/about.js', './pages/about.js'],
    ['/pages/docs.js', './pages/docs.js'],
    ['/pages/gator', './pages/gator'],
    ['/api/frontpage-data', './pages/api/frontpage-data'],
    ['/public/gator', './public/gator']
];


if (!action || action === 'init') {
    linkEntries.forEach(item => {
        const target = item[0];
        const path = item[1];
        fs.symlink(__dirname + target,
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


