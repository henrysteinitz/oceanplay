class Api::CommentsController < ApplicationController

  def show
    @track = Track.find(params[:id])
    if @track
      render :index
    else
      render json: {status: 400, errors: ['track not found']}
    end
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: {status: 400, errors: @comment.errors.full_messages}
    end
  end

  def destroy

  end

  private
  def comment_params
    params.require(:comment).permit(:track_id, :body, :time)
  end

end
