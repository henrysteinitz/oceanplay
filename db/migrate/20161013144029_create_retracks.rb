class CreateRetracks < ActiveRecord::Migration[5.0]
  def change
    create_table :retracks do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
