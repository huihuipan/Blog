# /bin/bash

cd C:/$/Blog

git add .

git commit -m 'publish'

git push origin main

echo '已提交Blog'

rm -rf C:/$/hexo/source/_posts

cp C:/$/Blog/Javascript/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/Java/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/Linux/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/DB/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/Docker/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/Nginx/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/Typescript/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/设计模式/*.md C:/$/hexo/source/_posts
cp C:/$/Blog/数据结构与算法/*.md C:/$/hexo/source/_posts

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