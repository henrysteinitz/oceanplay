class Api::TracksController < ApplicationController

  def show
    @track = Track.find(params[:id])
    if @track
      render :show
    else
      render json: {status: 400, errors: ["Track not found."]}
    end
  end

  def create
    @track = Track.new(track_params)
    @track.artist_id = current_user.id
    if @track.save
      render :show
    else
      render json: {status: 400, errors: @track.errors.full_messages}
    end
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :audio, :art)
  end

end
