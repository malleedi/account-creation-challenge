require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: 'abc123abc123abc')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: '1234567890')
    assert_not user.save
  end

  test "should save user with valid username and password" do
    user = User.new(username: '1234567890', password: 'abc123abc123abc')
    assert user.save
  end

  test "should validate username length" do
    assert_not User.validate_username('short'), "< 10"
    assert User.validate_username('1234567890'), ">= 10"
    assert User.validate_username('a' * 50), "= 50"
    assert_not User.validate_username('a' * 51), "> 50"
  end

  test "should validate password length" do
    assert_not User.validate_password('shortpass'), "< 20"
    assert User.validate_password('12345678901234567890a'), ">= 20"
    assert User.validate_password('a' * 49 + '1'), "= 50"
    assert_not User.validate_password('a' * 51), "> 50"
  end

  test "should validate password must contain letter and number" do
    user = User.new(username: 'validusername', password: 'abcdefghijklmno') # no number
    assert_not user.save, "Password without number should not save"

    user.password = '1234567890123456' # no letter
    assert_not user.save, "Password without letter should not save"

    user.password = 'abc123abc123abc' # letter and number
    assert user.save, "Password with letter and number should save"
  end
end
