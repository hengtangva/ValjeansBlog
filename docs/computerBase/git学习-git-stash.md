# git 学习- git stash     

今天在 push 代码的时候，push 不上，原来是别人 push 过了。       

本地的代码不是最新的。         

所以得先把代码 pull 下来。         

为了让 pull 下来的代码不干扰自己本地的代码。        

得先暂存起来，用 git stash   缓存本地代码到 git 栈中               

然后 git pull 拿到最新的代码。        

接着， git stash pop 把本地缓存的代码合并上去。        

如果，别人改动的地方和自己一样，会在对应的代码出现提示，确定用谁的代码。        

改完之后， git push  就可以推送上去了。  