"""
Title: Find Lucky Integer in an Array
Difficulty: Easy
Tags: Array, Hash Table, Counting
Date: 2025-07-24
Description: Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value. Return the largest lucky integer in the array. If there is no lucky integer return -1.
ProblemUrl: https://leetcode.com/problems/find-lucky-integer-in-an-array/
"""

class Solution:
    def findLucky(self, arr: List[int]) -> int:
        freq = Counter(arr)
        largest = -1

        for k,v in freq.items():
            if k == v:
                largest = max(largest, k)
        
        return largest