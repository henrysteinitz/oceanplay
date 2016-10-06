class Api::TracksController < ApplicationController

  def create

  end

  private
  def track_params
    params.require(:track).permit(:title, :audio, :art)
  end

end
