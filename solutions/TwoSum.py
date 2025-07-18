"""
Title: Two Sum
Difficulty: Easy
Tags: Array, Hash Table
Date: 2025-01-17
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