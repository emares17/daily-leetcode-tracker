export interface Solution {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  date: string;
  description: string;
  problemUrl: string;
  solution: string;
  filename: string;
}