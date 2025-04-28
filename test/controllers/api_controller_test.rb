class ApiControllerTest < ActionDispatch::IntegrationTest
  test "password_strength returns score" do
    post api_password_strength_path, params: { password: '123' }
    assert_response :success
    assert_equal 0, JSON.parse(response.body)['score']
  end

  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: 'abc123strongpassword' }
    assert_response :bad_request
    assert_equal "param is missing or the value is empty: username", JSON.parse(response.body)['error']
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: 'validusername' }
    assert_response :bad_request
    assert_equal "param is missing or the value is empty: password", JSON.parse(response.body)['error']
  end

  test "create_account fails with weak password (zxcvbn score < 2)" do
    post api_create_account_path, params: { username: 'validusername', password: '123' }
    assert_response :unprocessable_entity
    errors = JSON.parse(response.body)['error']
    assert_includes errors, "Password is too short (minimum is 12 characters)"
    assert_includes errors, "Password must include at least one letter and one number"
  end

  test "create_account fails with short username" do
    post api_create_account_path, params: { username: 'short', password: 'abc123abc123abc123abc123abc' }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['error'], "Username is too short (minimum is 10 characters)"
  end

  test "create_account fails if password missing number or letter" do
    post api_create_account_path, params: { username: 'validusername', password: 'abcdefghijabcdefghij' } # no number
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['error'], "Password must include at least one letter and one number"

    post api_create_account_path, params: { username: 'validusername', password: '12345678901234567890' } # no letter
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['error'], "Password must include at least one letter and one number"
  end

  test "create_account succeeds with valid username and strong password" do
    post api_create_account_path, params: { username: 'validusername', password: 'abc123strongpassword' }
    assert_response :created
    assert_equal true, JSON.parse(response.body)['success']
  end
end
