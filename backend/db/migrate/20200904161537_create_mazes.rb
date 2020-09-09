class CreateMazes < ActiveRecord::Migration[6.0]
  def change
    create_table :mazes do |t|
      t.integer :dimensions
      t.string :difficulty

      t.timestamps
    end
  end
end
