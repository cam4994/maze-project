class ScoresController < ApplicationController
    def index
        scores = Score.all
    end

    def create 
        score = Score.create(
            maze_id: params[:maze_id], 
            user_id: params[:user_id], 
            time: params[:time], 
            score: params[:score]
        )
        render json: score
    end
end
