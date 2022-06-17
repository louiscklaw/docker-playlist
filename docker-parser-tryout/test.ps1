docker kill $(docker ps -qa)
docker rm $(docker ps -qa)
docker-compose kill

docker-compose rm -s -v -f
docker image prune -f
docker volume prune -f
docker system prune -f

docker-compose build

docker-compose up