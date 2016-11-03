class Api::SearchController < ApplicationController

  def index
    @artists = User.where("lower(username) like ?", "%#{search_params[:string].downcase}%")
    @tracks = Track.where("lower(title) like ?", "%#{search_params[:string].downcase}%")
    render :index
  end

  private
  def search_params
    params.require(:search).permit(:string)
  end

end
