class ScoresController < ApplicationController
    def index
        scores = Score.high_scores
        render json: scores
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

    def easy 
        scores = Score.easy_high_scores
        render json: scores
    end

    def medium 
        scores = Score.medium_high_scores
        render json: scores
    end

    def hard
        scores = Score.hard_high_scores
        render json: scores
    end
end
