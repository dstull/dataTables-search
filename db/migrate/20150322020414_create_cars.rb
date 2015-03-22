class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :make
      t.string :model
      t.date :year
      t.string :color

      t.timestamps null: false
    end
  end
end
