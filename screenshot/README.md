# screenshot routes descriptions

#### 1. create new account
- Request `curl --location --request POST 'http://localhost:3010/newAccount' \
--header 'Content-Type: application/json' \
--data-raw '{
"userName": "Vicky_Cremin12",
"userPwd": "testPwd"
}'`

- Response `{"code": 200, "msg": "OK"}` - when user is new
- Response `{
  "code": "500",
  "message": "Account already exists"
  }` - when user is already registered

#### 2. Authenticate user (login)
- Request `curl --location --request POST 'http://localhost:3010/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "userName": "Vicky_Cremin9",
  "userPwd": "testPwd"
  }'`

- Response `{
  "tokenbn": "BHExgVVp",
  "tokenExpiresIn": 300
  }` - when auth was sucessfully
- Response `{
  "code": "500",
  "message": "Login failed"
  }` - when password is wrong
- Response `{
  "code": "404",
  "message": "User does not exist"
  }` - when user was not found

#### 3. Save user score
- Request `curl --location --request POST 'http://localhost:3010/saveScore' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "tokenbn": "j*bVu!P9",
  "myScore": "80"
  }'`

- Response `{"code": 200, "msg": "OK"}` - when score was save successfully
- Response `{"code": 200, "msg": "OK"}` - when score lower than the previous user score
- Response `{
  "code": "500",
  "message": "Bad token"
  }` - when token is not valid or is expired

#### 4. Retrieve leaderboard score
- Request `curl --location --request POST 'http://localhost:3010/leaderBoard' \
  --header 'token: j*bVu!P9' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "tokenbn": "j*bVu!P9"
  }'`

- Response `{
  "data": {
  "mine": {
  "myRank": 3,
  "userName": "Vicky_Cremin1",
  "score": "80"
  },
  "rank": [
  {
  "userName": "Vicky_Cremin6",
  "score": "250"
  },
  {
  "userName": "Vicky_Cremin3",
  "score": "100"
  },
  {
  "userName": "Vicky_Cremin1",
  "score": "80"
  }
  ]
  }
  }` - when the user has score
- Response `{
  "code": "500",
  "message": "Bad token"
  }` - when token is not valid or is expired
- Response `{
  "code": "500",
  "message": "Failed to retrieve user rank"
  }` - when the user does not have score
