#!/bin/bash
for file in ` ls keystroke_dataset `;
    do names=${file#*_};
        name=${names%*.csv};
        # echo $name;
        if grep $name data_collection.log
            then continue
        fi
        output=`node browser_collect_data.js $name`
        echo $output >> data_collection.log
    done