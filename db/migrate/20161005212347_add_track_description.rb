class AddTrackDescription < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :description, :text
    add_index :tracks, :title
  end
end
