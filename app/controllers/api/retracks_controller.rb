class Api::RetracksController < ApplicationController

  def create
    @retrack = Retrack.new(
      user_id: current_user.id,
      track_id: params[:retrack][:track_id]
    )
    if @retrack.save
      render :show
    else
      render json: {status: 400, errors: @retrack.errors.full_messages}
    end
  end

  def destroy
    @retrack = Retrack.find_by(track_id: params[:id])
    if @retrack
      @retrack.destroy
      render json: {status: 200, message: "Retrack deleted."}
    else
      render json: {status: 404, message:"Retrack not found."}
    end
  end

  def index
    @retracks = Retrack.where(user_id: current_user.id)
    render :index
  end

end
