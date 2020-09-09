class SessionsController < ApplicationController

    def create 
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: ["Welcome back #{user.username}!"]
        else
            if user == nil 
                error = ["That user does not exist."]
            else
                error = ["Password is incorrect."]
            end
            render json: error
        end
    end

    def destroy
        session.delete :user_id
    end
end