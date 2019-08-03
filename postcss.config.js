module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browserslist: [
        '> 1%',
        'last 2 versions',
        'dead',
        'last 3 iOS versions',
        'last 3 Android versions'
      ],
    }),
  ],
};

