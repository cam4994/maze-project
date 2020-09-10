class Score < ApplicationRecord
    belongs_to :user
    belongs_to :maze

    def self.high_scores
        scores = self.all.sort_by { |score| score[:score]}.reverse()
        scores.map do |score| 
            {"#{score.user.username}": [score.score, score.maze.difficulty]}
        end.take(10)
    end

    def self.easy_high_scores
        scores = self.select do |score|
            score.maze.difficulty == "Easy" 
        end.sort_by { |score| score[:score]}.reverse()

        scores.map do |score| 
            {"#{score.user.username}": [score.score, score.maze.difficulty]}
        end.take(5)
    end

    def self.medium_high_scores
        scores = self.select do |score|
            score.maze.difficulty == "Medium" 
        end.sort_by { |score| score[:score]}.reverse()

        scores.map do |score| 
            {"#{score.user.username}": [score.score, score.maze.difficulty]}
        end.take(5)
    end

    def self.hard_high_scores
        scores = self.select do |score|
            score.maze.difficulty == "Hard" 
        end.sort_by { |score| score[:score]}.reverse()

        scores.map do |score| 
            {"#{score.user.username}": [score.score, score.maze.difficulty]}
        end.take(5)
    end
end
