npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Heabys/prueba-tecnica-tk-front-static.git main:gh-pages

cd -