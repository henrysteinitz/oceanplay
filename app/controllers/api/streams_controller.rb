class Api::StreamsController < ApplicationController

  def show
    if stream_params[:tab] == 'recent'
      @stream = Track.joins(<<-SQL)
        LEFT OUTER JOIN
          retracks
        ON
          retracks.track_id = tracks.id
        LEFT OUTER JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        OR
          retracks.user_id = follows.followed_id
        WHERE
          #{current_user.id} = follows.follower_id
        OR
          #{current_user.id} = tracks.artist_id
      SQL
      @stream = @stream.order(<<-SQL)
        CASE
          WHEN
            retracks.track_id IS NULL
          THEN
            tracks.created_at
          WHEN
            retracks.track_id IS NOT NULL
          THEN
            retracks.created_at
        END DESC
      SQL
      @stream = @stream.includes(:comments)

    elsif stream_params[:tab] == 'popular'
      @stream = Track.find_by_sql(<<-SQL)
        SELECT
          tracks.*
        FROM
          tracks
        LEFT OUTER JOIN
          follows
        ON
          tracks.artist_id = follows.followed_id
        LEFT OUTER JOIN
          comments
        ON
          tracks.id = comments.track_id
        WHERE
          #{current_user.id} = follows.follower_id
        OR
          #{current_user.id} = tracks.artist_id
        ORDER BY
          tracks.play_count DESC, comments.created_at DESC
      SQL

    elsif stream_params[:tab] == 'all'
      @stream = Track.joins(<<-SQL)
        LEFT OUTER JOIN
          retracks
        ON
          retracks.track_id = tracks.id
        WHERE
          retracks.user_id = #{stream_params[:artist_id]}
        OR
          tracks.artist_id = #{stream_params[:artist_id]}
        ORDER BY
          CASE
            WHEN
              retracks.track_id IS NULL
            THEN
              tracks.created_at
            WHEN
              retracks.track_id IS NOT NULL
            THEN
              retracks.created_at
          END DESC
      SQL

    elsif stream_params[:tab] == 'tracks'
      @stream = Track.where("artist_id = #{stream_params[:artist_id]}")
        .order('created_at DESC')

    elsif stream_params[:tab] == 'retracks'
      @stream = Retrack.where("user_id = #{stream_params[:artist_id]}")
        .order('created_at DESC').includes(:track)
      @stream = @stream.map { |retrack| retrack.track }

    elsif stream_params[:tab] == 'library'
      @stream = Like.joins(<<-SQL)
        JOIN
          tracks
        ON
          tracks.id = likes.track_id
        WHERE
          likes.user_id = #{current_user.id}
        ORDER BY
          created_at DESC
      SQL
      @stream = @stream.map { |like| like.track }
    end
    render :show
  end

  private
  def stream_params
    params.require(:stream).permit(:tab, :artist_id)
  end

end
