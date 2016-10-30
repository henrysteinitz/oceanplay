class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      sign_in(@user)
      render 'api/users/show'
    else
      render json: {status: 401, errors: ['incorrect username/password']}
    end
  end

  def show
    @user = current_user
    if current_user
      render 'api/users/show'
    else
      render json: {status: 401, message: 'You are not signed in.'}
    end
  end

  def destroy
    sign_out if signed_in?
    render json: {status: 200, message: 'signed out successfully'}
  end
end
