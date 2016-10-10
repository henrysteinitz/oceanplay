class Api::StreamsController < ApplicationController

  def show
    if stream_params[:tab] == 'recent'
      @stream = Track.joins(<<-SQL)
        JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        AND
          #{current_user.id} = follows.follower_id
      SQL
      @stream = @stream.order('created_at DESC')
    else
      @stream = Track.find_by_sql(<<-SQL)
        SELECT
          tracks.*
        FROM
          tracks
        JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        AND
          #{current_user.id} = follows.follower_id
        ORDER BY
          tracks.play_count DESC
      SQL
    end

    render :show
  end

  private
  def stream_params
    params.require(:stream).permit(:tab)
  end

end
