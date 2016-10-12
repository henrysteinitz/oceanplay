class AddTrackIdToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :track_id, :integer, null: false
  end
end
