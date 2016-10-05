class AddAttachmentArtToTracks < ActiveRecord::Migration
  def self.up
    change_table :tracks do |t|
      t.attachment :art
    end
  end

  def self.down
    remove_attachment :tracks, :art
  end
end
