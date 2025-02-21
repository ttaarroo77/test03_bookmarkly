class BookmarksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_bookmark, only: [:edit, :update, :destroy]

  def index
    @bookmarks = current_user.bookmarks
    @bookmarks = @bookmarks.search_by_tag(params[:tag]) if params[:tag].present?
    @bookmarks = @bookmarks.order(created_at: :desc)
    @bookmark = current_user.bookmarks.build

    respond_to do |format|
      format.html
      format.json { render json: @bookmarks.as_json(include: :tags) }
      format.turbo_stream { render partial: 'bookmarks', locals: { bookmarks: @bookmarks } }
    end
  end

  def create
    @bookmark = current_user.bookmarks.build(bookmark_params)

    respond_to do |format|
      if @bookmark.save
        format.html { redirect_to bookmarks_path, notice: 'ブックマークを追加しました' }
        format.json { render json: @bookmark.as_json(include: :tags), status: :created }
        format.turbo_stream { redirect_to bookmarks_path, notice: 'ブックマークを追加しました' }
      else
        Rails.logger.error("Bookmark creation failed: #{@bookmark.errors.full_messages}")
        format.html do
          @bookmarks = current_user.bookmarks.order(created_at: :desc)
          flash.now[:alert] = @bookmark.errors.full_messages.join(", ")
          render :index, status: :unprocessable_entity
        end
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
        format.json { render json: @bookmark.as_json(include: :tags) }
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

  def new
    @bookmark = Bookmark.new
  end

  def show
    @bookmark = Bookmark.find(params[:id])
  end

  private

  def set_bookmark
    @bookmark = current_user.bookmarks.find(params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:url, :title, :tag_list, :description)
  end
end
