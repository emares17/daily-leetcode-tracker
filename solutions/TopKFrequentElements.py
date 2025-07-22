"""
Title: Top K Frequent Elements
Difficulty: Medium
Tags: Array, Hash Table, Heap, Sorting
Date: 2025-07-21
Description: Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
ProblemUrl: https://leetcode.com/problems/top-k-frequent-elements/
"""

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = {}
        
        for num in nums:
            freq[num] = freq.get(num, 0) + 1

        max_heap = [(-val, key) for key, val in freq.items()]

        heapq.heapify(max_heap)

        most_freq = heapq.nsmallest(k, max_heap)

        return [key for val, key in most_freq]