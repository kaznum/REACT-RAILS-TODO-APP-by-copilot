module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: %i[show update destroy]

      def index
        @todos = current_user.todos.sorted
        render json: @todos
      end

      def show
        render json: @todo
      end

      def create
        @todo = current_user.todos.build(todo_params)

        if @todo.save
          render json: @todo, status: :created
        else
          render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @todo.destroy
        head :no_content
      end

      private

      def set_todo
        @todo = current_user.todos.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'TODOが見つかりません' }, status: :not_found
      end

      def todo_params
        params.require(:todo).permit(:title, :due_date, :completed, :priority)
      end
    end
  end
end
