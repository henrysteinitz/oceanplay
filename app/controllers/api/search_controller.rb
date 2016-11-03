class Api::SearchController < ApplicationController

  def index
    @artists = User.where("username like ?", "%#{search_params[:string]}%")
    @tracks = Track.where("title like ?", "%#{search_params[:string]}%")
    render :index
  end

  private
  def search_params
    params.require(:search).permit(:string)
  end

end
