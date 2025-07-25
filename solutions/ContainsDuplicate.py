"""
Title: Contains Duplicate
Difficulty: Easy
Tags: Array, Sets
Date: 2025-07-24
Description: Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
ProblemUrl: https://leetcode.com/problems/contains-duplicate/
"""

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        repeats = set(nums)
        
        if len(repeats) != len(nums):
            return True
        else:
            return False