class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # nameのバリデーションを任意に変更
  validates :name, presence: false  # または完全に削除

  validates :email, presence: true, uniqueness: true

  # nameを許可する属性として追加
  attr_accessor :name

  has_many :bookmarks, dependent: :destroy
end
