# git 的初始配置

如果想用 ssh 克隆代码，首先需要在  gitlab 添加本地的公钥。         

而生成密钥可以如下做。        

1. 打开 git bash         

2. $ ssh-keygen -t ed25519 -C "your_email@example.com"         

:::tip
Note: If you are using a legacy system that doesn't support the Ed25519 algorithm, use:

$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
:::        

这一步会按照你的邮箱，生产密钥对         

3. 一直 enter 就好了。        

4. 可以在 user 的 .git 文件夹中找到公钥，是 .pub 文件          

5. 将该公钥复制到 gitlab 就好了。             

6. 之后就可以 git clone 代码了。         
