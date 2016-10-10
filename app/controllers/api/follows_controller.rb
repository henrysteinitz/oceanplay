class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(
      follower_id: current_user.id,
      followed_id: follow_params[:followed_id]
    )
    if @follow.save
      render json: {status: 200, message: "success"}
    else
      render json: {status: 400, errors: @follow.errors.full_messages}
    end
  end

  def show
    @follow = Follow.find_by(
      follower_id: current_user.id,
      followed_id: follow_params[:followed_id]
    )
    if @follow
      render json: {status: 200, following: true}
    else
      render json: {status: 200, following: false}
    end
  end

  def destroy
    @follow = Follow.find_by(
      follower_id: current_user.id,
      followed_id: follow_params[:followed_id]
    )
    if @follow.destroy
      render json: {status: 200, message: "success"}
    else
      render json: {status: 400, errors: @follow.errors.full_messages}
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:followed_id)
  end

end
