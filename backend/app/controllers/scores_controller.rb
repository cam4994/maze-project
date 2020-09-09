class ScoresController < ApplicationController
    def index
        scores = Score.all
    end

    def create 
        puts params
    end
end
