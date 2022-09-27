# Find the sum of four numbers to a target number in an array of distinct integers

- putting the problem in the right format helps a lot
- the main idea is that we can generate a hash table of the sum of every possible combination of two numbers (**O(N^2)**)
- while generating the hash we can check if the current pair sum complement is already in the hashtable if so then it’s a solution
- the problem with this is that we see the same 4 numbers more than one time in the final result
- putting the problem in the right format (or thinking in it in the right way) helps us understand why the repetition happens
- The right way to think about it:
    - suppose there are four numbers that add to the target:
        
        target: 11
        
        ![Untitled](Find%20the%20sum%20of%20four%20numbers%20to%20a%20target%20number%20in%2084dcd983a1484746970ebbf767c433c7/Untitled.png)
        
    - The problem is when at (-1) the hashtable will have -1 and its combination with all the other three numbers that generate the solution
        
        [-1,3] [-1,7] [-1,2]
        
    - this means it will generate a solution once we start generating combinations that contain 3 (the second number)
        - It will generate 2 solutions that are basically the same →
        - [ [ -1,7] ,[3,2] ] and [ [-1,2] [3,7]]
        - [3,2] adds to 5 it will look for 6 in hash table so it will find [-1,7]
        - [3,7] adds to 10 it will look for 1 in hash table so it will find [-1,2]
        - both the solutions are the same 4 numbers
    - another solution will happen when we hit the third number:
        
        [ [ -1,3] , [7,2 ]] 
        
    - This results in three repeated solutions
- By butting the problem this way we can reach a conclusion:
    - if we didn’t add the first two numbers of a possible solution to the hash table at first but somehow add them before we start generating the third number’s combinations we will have the solution one time
    - this will not cancel any possible solutions → if we have the first two numbers in the hash before we hit the third for any possible solution all solutions will be found and without any repetition
- How to do this → solution steps:
    - start doing your double loop with i , j (j starts from i+1 → end)
    - for each number in i generate all ith combinations that are not already created (with j = i+1 → end)
    - check if the comp of any combination is in the hash
    - then add the compination of i with every other number that is already checked to the hash (with j =0 → i-1)
    - this way we make sure the combination of the first and second number in a solution is in the hash before the third is checked