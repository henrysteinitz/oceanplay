class Api::TracksController < ApplicationController

  def show
    @track = Track.find(params[:id])
    if @track
      render :track
    else
      render json: {status: 400, errors: ["Track not found."]}
    end
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render json: {message: "success!"}
    else
      render json: {status: 400, errors: @track.errors.full_messages}
    end
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :artist_id, :audio, :art)
  end

end
