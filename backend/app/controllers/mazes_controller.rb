class MazesController < ApplicationController
    def show
        maze = Maze.find(params[:id])
    end
end
