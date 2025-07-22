"""
Title: Group Anagrams
Difficulty: Medium
Tags: Array, Hash Table, Sorting, String
Date: 2025-07-22
Description: Given an array of strings strs, group the anagrams together. You can return the answer in any order.
ProblemUrl: https://leetcode.com/problems/group-anagrams/
"""

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        words = {}
        for word in strs:
            s_word = "".join(sorted(word))
            words[s_word] = words.get(s_word, []) + [word]
        
        output = list(words.values())

        return output