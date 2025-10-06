class SessionsController < ApplicationController
  skip_before_action :authorize_request

  def create
    user = User.from_omniauth(request.env['omniauth.auth'])
    
    if user.persisted?
      token = JsonWebToken.encode(user_id: user.id)
      redirect_to "#{ENV.fetch('FRONTEND_URL', 'http://localhost:8080')}/login?token=#{token}", allow_other_host: true
    else
      redirect_to "#{ENV.fetch('FRONTEND_URL', 'http://localhost:8080')}/login?error=authentication_failed", allow_other_host: true
    end
  end

  def failure
    redirect_to "#{ENV.fetch('FRONTEND_URL', 'http://localhost:8080')}/login?error=authentication_failed", allow_other_host: true
  end
end
