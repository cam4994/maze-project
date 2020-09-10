class SessionsController < ApplicationController

    def create 
        user = User.find_by(username: params[:username])
        if user
            render json: user

        else
            if user == nil 
                error = ["That user does not exist."]
            end
            render json: error
        end
    end
end