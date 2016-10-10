class Api::LikesController < ApplicationController

  def show
    @likes = Like.where(user_id: current_user.id)
    render :show
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      render json: {status: 200, like: {@like.track_id => true }}
    else
      render json: {status: 400, errors: @like.errors.full_messages}
    end
  end

  def destroy
    @like = Like.find_by(like_params)
    if @like.destroy
      render json: {status: 200, like: {@like.track_id => false }}
    else
      render json: {status: 400, errors: @like.errors.full_messages}
    end
  end

  private
  def like_params
    {
      track_id: params[:like][:track_id],
      user_id: current_user.id
    }
  end
end
