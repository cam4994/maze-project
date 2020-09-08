class UsersController < ApplicationController
    
    def create
        user = User.new(username: params[:username], password: params[:password])
        if user.save 
            session[:user_id] = user.id
            render json: user
        else
            render json: user.errors.full_messages
        end
    end
    
    def show
        user = User.find(params[:id])
    end
end
