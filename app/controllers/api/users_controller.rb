class Api::UsersController < ApplicationController

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
