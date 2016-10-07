class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id]);
    if @user
      render :show
    else
      render json: {status: 404, errors: ["User not found."]}
    end
  end

  def show_full
    @user = User.includes(:tracks).find(params[:id]);
    if @user
      render :show_full
    else
      render json: {status: 404, errors: ["User not found."]}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: {status: 400, errors: @user.errors.full_messages}
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
