"""
Title: Valid Parentheses
Difficulty: Easy
Tags: String, Stack
Date: 2025-07-18
Description: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
ProblemUrl: https://leetcode.com/problems/valid-parentheses/
"""

class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        
        return not stack