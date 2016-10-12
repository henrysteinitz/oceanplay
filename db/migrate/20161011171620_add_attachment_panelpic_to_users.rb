class AddAttachmentPanelpicToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :panelpic
    end
  end

  def self.down
    remove_attachment :users, :panelpic
  end
end
