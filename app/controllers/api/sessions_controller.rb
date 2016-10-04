class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      sign_in(@user)
      render 'api/users/show'
    else
      render json: {error: 'incorrect username/password'}
    end
  end

  def destroy
    sign_out if signed_in?
    render json: {message: 'signed out successfully'}
  end
end
