echo "build project"
./gradlew clean build

echo "start server"

cd ./build/libs
java -jar chat-flatform-0.0.1-SNAPSHOT.jar