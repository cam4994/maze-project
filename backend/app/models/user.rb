class User < ApplicationRecord
    has_secure_password
    has_many :scores
    has_many :mazes, through: :scores
    validates :username, uniqueness: true 
    validates :password, length: {minimum: 6}

end
