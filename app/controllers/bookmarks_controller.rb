class BookmarksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_bookmark, only: [:show, :edit, :update, :destroy]
  before_action :ensure_correct_user, only: [:edit, :update, :destroy]

  def index
    @bookmarks = current_user.bookmarks
    @bookmarks = @bookmarks.search(params[:query]) if params[:query].present?
    @bookmarks = @bookmarks.tagged_with(params[:tag]) if params[:tag].present?
    @bookmarks = @bookmarks.order(created_at: :desc)
    
    @bookmark = current_user.bookmarks.build # 新規作成フォーム用
  end

  def show
  end

  def new
    @bookmark = current_user.bookmarks.build
  end

  def create
    @bookmark = current_user.bookmarks.build(bookmark_params)
    if @bookmark.save
      redirect_to bookmarks_path, notice: 'ブックマークを作成しました'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @bookmark.update(bookmark_params)
      redirect_to bookmarks_path, notice: 'ブックマークを更新しました'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @bookmark.destroy
    redirect_to bookmarks_path, notice: 'ブックマークを削除しました'
  end

  private

  def set_bookmark
    @bookmark = Bookmark.find(params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:title, :url, :description)
  end

  def ensure_correct_user
    unless @bookmark.user == current_user
      redirect_to bookmarks_path, alert: '権限がありません'
    end
  end
end
