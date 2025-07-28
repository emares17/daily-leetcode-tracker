"""
Title: Subarray Sum Equals K
Difficulty: Medium
Tags: Array, Hash Table, Prefix Sum
Date: 2025-07-28
Description: Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.
ProblemUrl: https://leetcode.com/problems/subarray-sum-equals-k/
"""

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        prefix_sum = 0

        prefix_count = {}

        prefix_count[0] = 1

        for num in nums:
            prefix_sum += num
            target = prefix_sum - k

            if target in prefix_count:
                count += prefix_count.get(target, 0)
            
            prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1

        return count