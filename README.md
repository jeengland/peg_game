# Peg Game Simulator

![Cracker Barrel peg game](https://i0.wp.com/blog.crackerbarrel.com/wp-content/uploads/2021/07/peg_game_1200x800.jpg?fit=1024%2C683&ssl=1 "Image from Cracker Barrel website")

This repository was made in a couple evenings after a dinner at Cracker Barrel to answer one burning question: how many solutions to the peg game are there? For the purpose of answering this question we made a few assumptions:

- We will use the same board as is available at Cracker Barrel, a triangle with 15 spaces.
- We have to start with the top peg corner peg missing
- We will consider symmetrical solutions as distinct from each other

Using those assumptions I coded a simulation of the board/game logic and a brute force recursive simulation that runs a depth first search on all possible move sets to determine how many pegs are left for each of them. I hypothesized that there should be in the order of tens of thousands of solutions.

## Results

For the constraints given above, a total of 568,630 sets of moves are possible. Of these, 29,760 or 5.2% are winning solutions, validating my hypothesis. Below are the totals for each possible remaining number of pegs.

| Remaining pegs | Total solutions | Percentage of total (568,630) |
| -------------- | --------------- | ----------------------------- |
| 1              | 29,760          | 5.23%                         |
| 2              | 139,614         | 24.55%                        |
| 3              | 259,578         | 45.65%                        |
| 4              | 123,664         | 21.75%                        |
| 5              | 14844           | 2.61%                         |
| 6              | 844             | 0.15%                         |
| 7              | 324             | 0.06%                         |
| 8              | 2               | 0.0004%                       |

## Observations

### About the results

- I certainly went in feeling good about myself for being able to consistently get it down to 2 pegs which is dashed now that I know it's a roughly 1/4 chance of doing so. That being said I got it down to 1 peg twice in 9 attempts so I'm batting above brute force 😎

- It seems like it would be a much more interesting exercise to see if you can strategize a method how to get 6+ pegs remaining, which I had observed in person as I had to take a very specifically foolish strategy to end up with 5 pegs

### About the process of coding this

- Writing in good debugging tools were a huge leg up in getting this simulation to work properly. I added tools to print out both a current state and a history of moves which let me figure out what was going wrong in a couple of situations that might have been trickier to debug without.

- Using classes isn't usually my M.O. but I know game logic is a place where OOP really shines so I decided to take that route this time. I ran into a few issues with nested class instances and cloning that required me to refactor things pretty significantly so I'd say it ended up being a good learning experience. Still will not be my preference going forward.

- I wanted to keep this lightweight so I didn't add testing but I think this project would have been significantly less frustrating in certain parts if I had taken a test-driven approach. Several breaking changes cost me a few hours of work that would have been easily caught if tests had been backing me, and I would have caught a couple of edge cases earlier.

## Running this project

If you want to run this project it should be pretty easy! Simply clone this repo to your local machine and run

```
npm run start
```

from the root directory. This doesn't pull in any packages so no need to install.

## Resources

After writing this code and finding the answer myself I naturally went to see if other people had done work on this problem. Turns out it's pretty well trodden territory! Listed below are a few resources I found interesting.

- [This](https://adueck.github.io/peg-solitaire-solver/) similar simulator which comes to the exact same solution 8 months earlier than me, complete with a fancy UI and lots more features than mine (mine runs faster though)
- The [Wikipedia article](https://en.wikipedia.org/wiki/Peg_solitaire) on peg solitaire (a much nicer name than "Cracker Barrel peg game") includes a section on studies and solutions. I don't see this problem continuing to hold my interest but seems like there's a lot of potential if you want to extend this code!
- [This article](https://blogs.sas.com/content/operations/2015/05/20/dinner-with-a-side-order-of-optimization/) on someone else's search for a solution to the same problem (with the same result) and a few more interesting musings.
- [This website](http://www.gibell.net/pegsolitaire/tindex.html) from George Bell, who has dedicated a ton of time to all variations of peg solitaire and increasingly larger boards with a ton of interesting observations! A lot of things I was curious about are really well laid out on this site.
- [This simulator](http://www.gibell.net/pegsolitaire/Tools/Neverlose/Triang.htm#) from the above mentioned George Bell which I love, it tells you when a move you're about to make is going to prevent you from being able to win. Really if you're interested in this problem at all the two above links are a treasure trove of well written information.
