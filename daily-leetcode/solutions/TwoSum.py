"""
Title: Two Sum
Difficulty: Easy
Tags: Array, Hash Table
Date: 2025-01-15
Description: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.
ProblemUrl: https://leetcode.com/problems/two-sum/
"""

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        n = len(nums)
        
        for i in range(n):
            complement = target - nums[i]
            if complement in numMap:
                return [numMap[complement], i]
            numMap[nums[i]] = i
        
        return []  # No solution found