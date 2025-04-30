# frozen_string_literal: true
require 'zxcvbn'

class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  def password_strength
    password = params[:password]
    result = Zxcvbn.test(password)
    render json: { score: result.score }
  end

  def create_account
    user_params = params.permit(:username, :password)
  
    if user_params[:username].blank?
      render json: { error: "Username is missing" }, status: :bad_request
      return
    end
  
    if user_params[:password].blank?
      render json: { error: "Password is missing" }, status: :bad_request
      return
    end
  
    user = User.new(user_params)
  
    if user.invalid?
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      return
    end
  
    if check_password_strength(user.password) < 2
      render json: { error: "Password is too weak" }, status: :unprocessable_entity
      return
    end
  
    if user.save
      render json: { success: true, message: 'Account successfully created!' }, status: :created
    else
      render json: { success: false, error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  private

  def check_password_strength(password)
    result = Zxcvbn.test(password)
    result.score
  end
end
