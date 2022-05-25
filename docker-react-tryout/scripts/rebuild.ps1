docker ps -qa
docker kill $(docker ps -qa)
docker rm -f $(docker ps -qa)

docker image rm nameofyourapp

cd my-app
  docker build -t nameofyourapp:latest .
  docker run --name nameofyourchoice -d -p 3000:3000 nameofyourapp:latest
cd ..
