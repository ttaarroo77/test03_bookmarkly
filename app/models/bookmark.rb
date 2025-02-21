class Bookmark < ApplicationRecord
  belongs_to :user
  has_many :bookmark_tags, dependent: :destroy
  has_many :tags, through: :bookmark_tags

  validates :url, presence: true, 
                 format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) },
                 uniqueness: { scope: :user_id }
  validates :title, presence: true, length: { maximum: 255 }

  scope :search_by_tag, ->(tag) {
    if tag.present?
      joins(:tags).where('LOWER(tags.name) LIKE ?', "%#{tag.downcase}%")
    end
  }

  def tag_list
    tags.map(&:name).join(', ')
  end

  def tag_list=(names)
    self.tags = names.split(',').map do |name|
      Tag.where(name: name.strip.downcase).first_or_create!
    end
  end
end
