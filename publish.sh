# /bin/bash

cd C:/$/Blog

git add .

git commit -m 'publish'

git push origin main

echo '已提交Blog'

rm C:/$/hexo/source/_posts/*

cp C:/$/Blog/Javascript/ C:/$/hexo/source/_posts
cp C:/$/Blog/Java/ C:/$/hexo/source/_posts
cp C:/$/Blog/Linux/ C:/$/hexo/source/_posts
cp C:/$/Blog/DB/ C:/$/hexo/source/_posts
cp C:/$/Blog/Docker/ C:/$/hexo/source/_posts
cp C:/$/Blog/Nginx/ C:/$/hexo/source/_posts
cp C:/$/Blog/Typescript/ C:/$/hexo/source/_posts
cp C:/$/Blog/设计模式/ C:/$/hexo/source/_posts
cp C:/$/Blog/数据结构与算法/ C:/$/hexo/source/_posts

echo '复制文章'


echo '切换目录至hexo'

cd C:/$/hexo

echo '构建'

npm run build 

echo '构建成功'

cd C:/$/hexo/public

git add .

git commit -m 'publish'

git push origin main

echo '发布blog成功'