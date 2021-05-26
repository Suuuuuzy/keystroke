# README

### Keystroke logging attack

#### select_word.py

functionality:

select words from `origin_dataset/text.csv` and `origin_dataset/features.csv` (preprocessed the origin dataset in https://userinterfaces.aalto.fi/136Mkeystrokes/ with John V. Monaco's code )

procedure:

decompress `features.csv.zip`

modify `WORDLEN`, `DATACOUNT` and `WORDINFILE` to choose the word you like

usage:

`python select_word.py`

output: 

`data_word.csv` in `keystroke_dataset/`

#### browser_collect_data.js/text_editor_collect_data.js

Prerequisite:

`npm install robotjs`

functionality:

| Functionality         | Code    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| requirement and setup | 1-5     | Require two packages and set the keyboard and mouse delay for robotjs |
| Main                  | 101-110 | Main function to read keystroke datafile to collect FPS second |
| ConvertToTable        | 90-99   | Convert the datafile into daata tables                       |
| tableCallback         | 15-88   | Collect FPS data, we replay the keystroke with robotjs according to the interval data in the table<br />NOTE: 1. the parameters in `moveMouse` should be modified according to the location of the two browser windows. 2. you have to save the FPS data in the aquarium.html console by yourself. |
| input_word            | 113-138 | Input word accroding to the intervals we get from the table, and save the real time of each keystroke as a file in `data/WORD/REALTIME.txt` |

usage:

1. close all chrome windows
2. open http://3.221.81.120/gpu_attack.github.io/aquarium/aquarium.html in a new chrome window
3. open http://www.baidu.com/ in a new chrome window
4. run `node browser_collect_data.js WORD`
5. work with the prompt
6. get the data in `data/word`

collected data:

filename.endswith('_.txt'):

format: `keyTimeFile: [timestamp], [key]`

filename.endswith('.txt'): 

format: `TimeFPSFile: [timestamp, how many seconds each frame takes up]`

#### processing.py/processing_auto_data.py

functionality:

process collected FPS data, predict one input

usage: 

`python precessiong.py TimeFPSFile keyTimeFile`

output: 

predicted length of this input

#### graph.py/graph_auto_data.py

functionality:

import processing/processing_auto_data, draw graph to show the the FPS and corresponding keystroke timestamp

usage:

`python Local_simple.py TimeFPSFile keyTimeFile`

output:

an image showing the the FPS and corresponding keystroke timestamp and prediction

#### F1_calcu.py

functionality: see the predictions of each word

usage: `python F1_calcu.py 1`

output: predicted length of this word

functionality: input lengths of words to do classification between them

usage: `python F1_calcu.py 2 3`

output: macro precision, recall and f1

functionality: select the highest F1-scores

usage: `python F1_calcu.py`

output: [precision, recall, f1, wordLengthList] with maximum f1