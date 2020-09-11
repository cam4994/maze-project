class User < ApplicationRecord
    has_many :scores
    has_many :mazes, through: :scores
    validates :username, uniqueness: true 

    def my_scores
        scores = self.scores.sort_by { |score| score[:score]}.reverse()
        
        scores = scores.map do |score|
            [score.score, score.maze.difficulty, score.id]
        end.take(10)

        {"#{self.username}": scores}
    end
end
