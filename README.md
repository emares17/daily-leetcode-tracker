# **Daily LeetCode Tracker**  
_A beautiful IDE-themed blog to track your daily LeetCode solutions and showcase your coding interview preparation progress._

## Features  
- **VS Code-inspired dark theme** with syntax highlighting  
- **Search and filter** solutions by title, tags, or difficulty  
- **Responsive design** for all devices  
- **Automatic updates** – push a solution, blog updates instantly  
- **Progress tracking** with solution counts and metadata  
- **Direct links** to LeetCode problems  
- **Interview prep-focused** – perfect for showcasing your journey  

---

## Quick Start  

### 1. Use This Template  
Click the **“Use this template”** button above to create your own repository.  

### 2. Clone Your New Repository  
```bash
git clone https://github.com/emares17/daily-leetcode-tracker.git
cd daily-leetcode

# Install blog dependencies
npm install

# Install parser dependencies
cd scripts
npm install
cd ..

```

### 4. Add Your First Solution  
Replace the example file in `solutions/` with your actual LeetCode solution. Create a new `.py` file for each problem you solve (e.g., `TwoSum.py`, `ValidParentheses.py`, etc.):


```python
"""
Title: Two Sum
Difficulty: Easy
Tags: Array, Hash Table
Date: 2025-01-15
Description: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
ProblemUrl: https://leetcode.com/problems/two-sum/
"""

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in numMap:
                return [numMap[complement], i]
            numMap[num] = i
        return []

```

### 5. Push Your Solutions and Watch the Magic
Every time you solve a new problem, add the solution file and push to trigger the automatic blog update:

```bash
git add .
git commit -m "Add Two Sum solution"
git push
```

### 6. Deploy Your Blog (One-Time Setup)
Deploy your blog to make it publicly accessible and shareable with recruiters:

**Option A: Vercel (Recommended)**
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click "New Project" and import your repository
3. Vercel will automatically detect it's a Vite project
4. Click "Deploy" - your blog will be live in minutes!
5. Get your live URL (e.g., `your-repo.vercel.app`)

**Option B: Netlify**
1. Build your project locally:
  ```bash
  npm run build
```

## Solution File Format

Each solution file must follow this exact format:

```python
"""
Title: [Problem Name]
Difficulty: [Easy|Medium|Hard]
Tags: [Tag1, Tag2, Tag3]
Date: [YYYY-MM-DD]
Description: [Problem description]
ProblemUrl: [LeetCode problem URL]
"""

# Your solution code here
class Solution:
   def methodName(self, params):
       # Your implementation
       pass
```

**Required Fields:**  

- **Title:** Exact problem name from LeetCode  
- **Difficulty:** One of `Easy`, `Medium`, or `Hard`  
- **Tags:** Comma-separated list of relevant tags  
- **Date:** Date you solved it (`YYYY-MM-DD` format)  
- **Description:** Brief problem description  
- **ProblemUrl:** Direct link to the LeetCode problem  

## Development  

### Run Locally  
```bash
npm run dev
```

### Parse Solutions Manually
```bash
cd scripts
node parse-solutions.js
```
## Customization  

### Change Theme Colors  
Edit the color variables in `src/components/DailyLeetCode.tsx`:  

```typescript
// Change these hex colors to customize your theme
bg-[#0d1117]     // Background
bg-[#161b22]     // Card background  
border-[#30363d] // Borders
text-[#8b949e]   // Secondary text
```
### Add More Languages
The parser currently supports Python, Javascript, Java, C++ but you can extend it for other languages by modifying `scripts/parse-solutions.js`.

### Custom Metadata
Add additional fields by updating the parser and React components to display more information about your solutions.

## GitHub Actions

The repository includes a pre-configured GitHub Action that:

1. **Triggers** when you push files to `solutions/`
2. **Parses** your solution files automatically
3. **Updates** the blog data
4. **Commits** changes back to your repository

### Manual Trigger
You can also manually trigger the action from the GitHub Actions tab.

### Contributing
Found a bug or want to add a feature? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### License
This project is open source and available under the MIT License.

## Happy Coding!