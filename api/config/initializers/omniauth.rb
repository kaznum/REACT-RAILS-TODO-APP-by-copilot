Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
           ENV.fetch('GOOGLE_CLIENT_ID'),
           ENV.fetch('GOOGLE_CLIENT_SECRET'),
           {
             scope: 'email,profile',
             prompt: 'select_account',
             image_aspect_ratio: 'square',
             image_size: 50,
             skip_jwt: true
           }
end

OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.silence_get_warning = true
