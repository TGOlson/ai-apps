git checkout -B gh-pages

npm run clean
npm run build-prod

mkdir -p assets

cp dist/* assets/
cp public/index.html .

git add .
git commit -m'deloy to gh-pages'

git push origin gh-pages -f

rm -rf assets

git checkout main
