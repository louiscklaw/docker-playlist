@REM https://jwt.io/

@REM curl http://192.168.10.61:3003/todos

@REM curl http://192.168.10.61:3003/todos -X POST -H "Content-Type: application/json" -d "{\"task\": \"do bad thing\"}"

@REM curl http://192.168.10.61:3003/todos -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.2Z1kya-XeavXu4dd_Z8IONN59pEC4D439lP2Vzp8yCc" -H "Content-Type: application/json" -d "{\"task\": \"learn how to auth\"}"

@REM https://postgrest.org/en/stable/api.html#operators
@REM curl http://192.168.10.61:3003/todos -X PATCH -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.2Z1kya-XeavXu4dd_Z8IONN59pEC4D439lP2Vzp8yCc" -H "Content-Type: application/json" -d "{\"done\": true}"
@REM curl "http://192.168.10.61:3003/people?age=gte.18&student=is.true"

curl "http://192.168.10.61:3003/todos?done=eq.false"
