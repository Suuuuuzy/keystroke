# README

## Words with different lengths:

2 to

3 the

4 will

5 would

6 office

7 working

8 minister

9 elections

10 difference

11 distributed

12 relationship

## See the results!

### run.py

##### see the predictions of each word

usage: python run.py 1

output: predicted length of this word

##### input lengths of words to do classification between them

usage: python run.py 2 3

output: macro precision, recall and f1

##### select the highest F1-scores

usage: python run.py

output: [precision, recall,  f1, wordLengthList] with maximum f1 

## Other files

### ks_collect_data.js

##### Prerequisite

`npm install robotjs`

##### Procedure

1. close all chrome windows
2. open <http://3.221.81.120/gpu_attack.github.io/aquarium/aquarium.html> in a new chrome window
3. open <http://www.baidu.com/> in a new chrome window
4. run `node ks_collect_data.js word_in_keystroke_dataset` 
5. work with the prompt
6. get the data in `data/word`

##### Data

if filename.endswith('_.txt'): 

​	keyTimeFile: [timestamp], [key] 

elif filename.endswith('.txt'): 
	TimeFPSFile: [timestamp, how many seconds each frame takes up]

### Local_simple.py

usage: python Local_simple.py TimeFPSFile keyTimeFile

output: an image describing the fact the prediction

### select_word.py

##### select words from `origin_dataset/text.csv` and `origin_dataset/features.csv` (preprocessed the origin dataset in <https://userinterfaces.aalto.fi/136Mkeystrokes/> with John V. Monaco's code )

decompress `features.csv.zip`

modify WORDLEN, DATACOUNT and WORDINFILE to choose the word you like

output: `data_word.csv` in `keystroke_dataset/`

### processing.py

##### predict one input

usage: python precessiong.py TimeFPSFile keyTimeFile

output: predicted length of this input