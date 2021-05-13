# git学习- 合并分支 

## 创建主分支

今天学习一下 git 的合并分支，顺带学一下，创建分支，删除分支等。         

首先，新建一个文件夹 test。         

打开控制台： git init 新建仓库。       

然后，新建一个文件 test.txt         

如下：     

![](./assets/gitm1.jpg)         

- ok, 保存后，我们 git add test.txt 暂存文件         

- 接着，git commit -m 'master-test' 提交        

![](./assets/gitm2.jpg)        

---      

ok ，我们的主分支， master 已经有东西了，接下来我们在新的分支上工作         

## 创建 dev 分支       

这里先补充一点命令。     

:::tip
git branch dev      (创建新的分支 git branch name)         

git switch dev      (切换分支 git switch name)       

git branch          (查看所有分支，和当前处在分支)         

git branch -d dev   (删除分支 git branch -d name)     

git merge dev       (把 dev 分支合并到当前分支 git merge name)
:::      

- ok。 我们继续来完成接下来的工作。      

我们先新建一个 dev 分支 接着，进入该分支, 并查看分支     

- git branch dev        

- git switch dev       

- git branch        

![](./assets/gitm3.jpg)       

- 可以看到，我们有了两个分支，当前处于 dev 分支。       

我们在 dev 下工作，打开 test.txt 修改一下。     

![](./assets/gitm4.jpg)       

红圈是修改的内容。      

我们在该分支，暂存并提交。     

- git add test.txt        

- git commit -m 'test-dev'        

![](./assets/gitm5.jpg)       

## 合并分支

好了，现在我们知道自己有两个分支，一个 master， 一个 dev        

我们先回到 master 分支。     

- git switch master      

- git branch      

![](./assets/gitm6.jpg)       

---     

可以看到，我们 master 下的 test.txt 还是 hello world 没有变化。      

接下来，我们把 dev 分支合并到 master 上面去      

- git merge dev        

![](./assets/gitm7.jpg)      

- 可以看到，我们的 master 分支下，已经有了 dev 合并过来的内容了。      

结束后，我们删除 dev 分支。     

- git branch -d dev     

- git branch      

![](./assets/gitm8.jpg)      

---     

可以看到 我们的 dev 分支已经给删除了。       

---       

到此，我们的 git 协作工作就完成了。 