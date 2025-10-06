module Api
  module V1
    class UsersController < ApplicationController
      def current
        render json: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
          image_url: current_user.image_url
        }
      end
    end
  end
end
