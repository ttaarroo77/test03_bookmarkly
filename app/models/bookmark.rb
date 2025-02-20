class Bookmark < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates :description, length: { maximum: 500 }
end
