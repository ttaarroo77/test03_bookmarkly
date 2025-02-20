class BookmarksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_bookmark, only: [:show, :edit, :update, :destroy]

  def index
    @bookmarks = current_user.bookmarks
    @bookmarks = @bookmarks.search(params[:query]) if params[:query].present?
    @bookmarks = @bookmarks.order(created_at: :desc)
    @bookmark = current_user.bookmarks.build  # 新規作成フォーム用

    respond_to do |format|
      format.html
      format.json { render json: @bookmarks }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @bookmark }
    end
  end

  def new
    @bookmark = current_user.bookmarks.build
  end

  def create
    @bookmark = current_user.bookmarks.build(bookmark_params)

    respond_to do |format|
      if @bookmark.save
        format.html { redirect_to bookmarks_path, notice: 'ブックマークを作成しました' }
        format.json { render json: @bookmark, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bookmark.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @bookmark.update(bookmark_params)
        format.html { redirect_to bookmarks_path, notice: 'ブックマークを更新しました' }
        format.json { render json: @bookmark }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bookmark.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @bookmark.destroy
    respond_to do |format|
      format.html { redirect_to bookmarks_path, notice: 'ブックマークを削除しました' }
      format.json { head :no_content }
    end
  end

  private

  def set_bookmark
    @bookmark = current_user.bookmarks.find(params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:title, :url, :description, :tag_list)
  end
end
