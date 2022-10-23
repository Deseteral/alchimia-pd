#!/bin/sh
PROJECT_NAME="$(basename $PWD)"

rm -rf ./build ./Source/*.bin ./Source/*.dylib
mkdir ./build

cd ./build

if [ $1 = "--device" ]; then
    cmake -DCMAKE_TOOLCHAIN_FILE="$HOME/Developer/PlaydateSDK/C_API/buildsupport/arm.cmake" ..
else
    cmake ..
fi

make

mv ../pdbundle.pdx "./$PROJECT_NAME.pdx"
