class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # サインアップ時のパラメータ設定
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])

    # アカウント編集時のパラメータ設定
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
end
