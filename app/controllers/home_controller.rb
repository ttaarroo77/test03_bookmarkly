class HomeController < ApplicationController
  def index
    redirect_to bookmarks_path if user_signed_in?
  end
end
