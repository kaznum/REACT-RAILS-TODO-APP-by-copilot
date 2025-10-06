class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    
    decoded = JsonWebToken.decode(token)
    if decoded
      @current_user = User.find_by(id: decoded[:user_id])
      render json: { error: 'ユーザーが見つかりません' }, status: :unauthorized unless @current_user
    else
      render json: { error: '認証が必要です' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'ユーザーが見つかりません' }, status: :unauthorized
  end
end
