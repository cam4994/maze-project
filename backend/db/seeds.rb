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