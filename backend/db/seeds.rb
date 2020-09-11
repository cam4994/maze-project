# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

easy_maze = Maze.create(dimensions: 25, difficulty: "Easy")
medium_maze = Maze.create(dimensions: 31, difficulty: "Medium")
hard_maze = Maze.create(dimensions: 37, difficulty: "Hard")

user1 = User.create(username: "Colin")
user2 = User.create(username: "Sohyun")
user3 = User.create(username: "Nandita")

score1 = Score.create(user_id: 1, maze_id: 1, time: 30, score: 200)
score1 = Score.create(user_id: 3, maze_id: 2, time: 30, score: 2120)
score1 = Score.create(user_id: 1, maze_id: 1, time: 30, score: 2300)
score1 = Score.create(user_id: 2, maze_id: 3, time: 34, score: 3000)
score1 = Score.create(user_id: 2, maze_id: 2, time: 33, score: 1000)
score1 = Score.create(user_id: 1, maze_id: 1, time: 30, score: 2000)
