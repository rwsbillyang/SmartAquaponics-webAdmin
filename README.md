# Using the default output directory: "dist/"
vite build
purgecss --css 'dist/**/*.css' --content 'dist/**/*.!(css)'