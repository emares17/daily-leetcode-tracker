"""
Title: Is Subsequence
Difficulty: Easy
Tags: Array, Two Pointers, String
Date: 2025-07-26
Description: Given two strings s and t, return true if s is a subsequence of t, or false otherwise. A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
ProblemUrl: https://leetcode.com/problems/is-subsequence/
"""

class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for l in t:
            if i < len(s) and s[i] == l:
                i += 1
        return i == len(s)