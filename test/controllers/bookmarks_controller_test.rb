require "test_helper"

class BookmarksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:test_user)
    sign_in @user
    @bookmark = bookmarks(:one)
  end

  test "should get index" do
    get bookmarks_url
    assert_response :success
  end

  test "should get new" do
    get new_bookmark_url
    assert_response :success
  end

  test "should create bookmark" do
    assert_difference("Bookmark.count") do
      post bookmarks_url, params: { 
        bookmark: { 
          title: "Test Bookmark", 
          url: "https://example.com", 
          description: "Test description" 
        } 
      }
    end

    assert_redirected_to bookmarks_url
  end

  test "should show bookmark" do
    get bookmark_url(@bookmark)
    assert_response :success
  end

  test "should get edit" do
    get edit_bookmark_url(@bookmark)
    assert_response :success
  end

  test "should update bookmark" do
    patch bookmark_url(@bookmark), params: { 
      bookmark: { 
        title: "Updated Title" 
      } 
    }
    assert_redirected_to bookmarks_url
  end

  test "should destroy bookmark" do
    assert_difference("Bookmark.count", -1) do
      delete bookmark_url(@bookmark)
    end

    assert_redirected_to bookmarks_url
  end
end
