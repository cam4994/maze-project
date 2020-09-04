class User < ApplicationRecord
    has_many :scores
    has_many :mazes, through: :scores
end
