class Api::StreamsController < ApplicationController

  def show
    if stream_params[:tab] == 'recent'
      @stream = Track.joins(<<-SQL)
        LEFT OUTER JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        WHERE
          #{current_user.id} = follows.follower_id
        OR
          #{current_user.id} = tracks.artist_id
      SQL

      @stream = @stream.order('created_at DESC')
    else
      @stream = Track.find_by_sql(<<-SQL)
        SELECT
          tracks.*
        FROM
          tracks
        LEFT OUTER JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        WHERE
          #{current_user.id} = follows.follower_id
        OR
          #{current_user.id} = tracks.artist_id
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
