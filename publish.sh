# /bin/bash

cd C:/$/Blog

git add .

git commit -m 'publish'

git push origin master

echo '已提交Blog'

cp C:/$/Blog/*/*.md C:/$/hexo/source/_posts

echo '复制文章'

npm run build 

echo '构建'

cd C:/$/hexo/public

git add .

git commit -m 'publish'

git push origin main

echo '发布blog成功'