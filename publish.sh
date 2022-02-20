# /bin/bash

cd ~/Blog

git add .

git commit -m 'publish'

git push origin main

echo '已提交Blog'

rm C:~/hexo_for_blog/source/_posts/*

cp ~/Blog/Javascript/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/Java/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/Linux/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/DB/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/Docker/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/Nginx/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/Typescript/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/设计模式/*.md ~/hexo_for_blog/source/_posts
cp ~/Blog/数据结构与算法/*.md ~/hexo_for_blog/source/_posts

echo '复制文章'


echo '切换目录至hexo'

cd ~/hexo_for_blog

echo '构建'

npm run build 

echo '构建成功'

cd ~/hexo_for_blog/public

git add .

git commit -m 'publish'

git push origin main

echo '发布blog成功'