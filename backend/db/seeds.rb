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

user1 = User.create(username: "Patrick Mahomes")
user2 = User.create(username: "Jared Goff")
user3 = User.create(username: "Maze Master 34")
user4 = User.create(username: "Colin Mosley")
user5 = User.create(username: "Tom Brady")
user6 = User.create(username: "Peyton Manning")
user7 = User.create(username: "Carson Wentz")

Score.create(user_id: 1, maze_id: 1, time: 35, score: 1400)
Score.create(user_id: 1, maze_id: 3, time: 33, score: 3120)
Score.create(user_id: 1, maze_id: 1, time: 35, score: 2450)
Score.create(user_id: 1, maze_id: 2, time: 33, score: 2120)
Score.create(user_id: 1, maze_id: 3, time: 30, score: 3300)
Score.create(user_id: 2, maze_id: 3, time: 34, score: 3000)
Score.create(user_id: 2, maze_id: 2, time: 33, score: 1000)
Score.create(user_id: 2, maze_id: 1, time: 30, score: 2000)
Score.create(user_id: 3, maze_id: 1, time: 30, score: 200)
Score.create(user_id: 3, maze_id: 2, time: 30, score: 2120)
Score.create(user_id: 4, maze_id: 1, time: 30, score: 2300)
Score.create(user_id: 4, maze_id: 3, time: 34, score: 3000)
Score.create(user_id: 4, maze_id: 2, time: 23, score: 2988)
Score.create(user_id: 5, maze_id: 2, time: 10, score: 3331)
Score.create(user_id: 5, maze_id: 1, time: 30, score: 2324)
Score.create(user_id: 5, maze_id: 3, time: 10, score: 4333)
Score.create(user_id: 5, maze_id: 1, time: 30, score: 2300)
Score.create(user_id: 6, maze_id: 3, time: 34, score: 3000)
Score.create(user_id: 6, maze_id: 2, time: 33, score: 1000)
Score.create(user_id: 7, maze_id: 3, time: 30, score: 2420)
Score.create(user_id: 7, maze_id: 1, time: 34, score: 3000)
Score.create(user_id: 7, maze_id: 2, time: 33, score: 4002)
Score.create(user_id: 7, maze_id: 3, time: 30, score: 2426)