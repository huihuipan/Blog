# /bin/bash

cd C:/$/Blog

git add .

git commit -m 'publish'

git push origin main

echo '已提交Blog'

cd C:/$/Blog/

rm -rf C:/$/hexo/source/_posts

cp [!杂记]/*.md C:/$/hexo/source/_posts

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