1. git checkout main
2. git pull upstream main
3. git checkout -b <feature-branch>
4. git pull upstream main
5. git push origin <feature-branch>
6. Pull Request => Review => Merge
  Is PR merged?
  if no
   1. make more commits to <feature-branch>
   2. git push origin <feature-branch>
  if yes 
    1. git checkout main
    2. git pull upstream main