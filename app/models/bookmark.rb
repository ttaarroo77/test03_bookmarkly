class Bookmark < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags

  validates :title, presence: true
  validates :url, presence: true, url: true
  validates :description, length: { maximum: 500 }

  scope :search, ->(query) { where("title LIKE ? OR description LIKE ?", "%#{query}%", "%#{query}%") }
  
  # タグ関連のメソッド
  def tag_list
    tags.map(&:name).join(', ')
  end

  def tag_list=(names)
    self.tags = names.split(',').map do |name|
      Tag.where(name: name.strip.downcase).first_or_create!
    end
  end
end
