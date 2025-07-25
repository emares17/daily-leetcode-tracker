"""
Title: Score of a String
Difficulty: Easy
Tags: String
Date: 2025-07-25
Description: You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters. Return the score of s.
ProblemUrl: https://leetcode.com/problems/score-of-a-string/
"""

class Solution:
    def scoreOfString(self, s: str) -> int:
        score = 0
        for letter in range(len(s) - 1):
            score = abs(ord(s[letter]) - ord(s[letter + 1]))
        return score