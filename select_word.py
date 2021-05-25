import csv
import os
import sys
import zipfile


WORDLEN = 14
DATACOUNT = 2
WORDWITHLEN = 3

# find some highly used words
def find_word(source_filepath):
    dict = {}
    line = 0
    wordlist = []
    with open(source_filepath, 'r') as source:
        reader = csv.reader(source)
        # print(reader)
        headers = next(reader)
        print(headers)
        # row = print(next(reader))
        while True:
            row = next(reader)
            text = row[2]
            # print(text)
            tmpwords = text.split(' ')
            # print(tmpwords)
            for word in tmpwords:
                if (word in dict):
                    dict[word].append(line)
                    if(len(dict[word])>=DATACOUNT and word not in wordlist and len(word)==WORDLEN):
                        wordlist.append(word)
                else:
                    dict[word] = [line]
                line = line+1
            if(len(wordlist)>=WORDWITHLEN):
                break
    # print(wordlist)
    # print(dict)

    dic  = {}
    # choose one word if you like
    # dic ['relationship'] = dict['relationship']
    for word in wordlist:
        dic[word] = dict[word]
        print(word)
    # print('dic', dic)
    return dic

def find_in_features(source_filepath, dic):
    dest_path = 'keystroke_dataset'

    for word in dic:
        target_filename = 'data_'+ word +'.csv'
        target_filepath = os.path.join(dest_path, target_filename)
        target = open(target_filepath, 'w')
        writer = csv.writer(target)
        
        # files = os.listdir(source_filepath)
        linenumbers = dic[word]
        # print('linenumbers', linenumbers) 
        for i in range(0, len(linenumbers)):
            linenumbers[i] = linenumbers[i]+3

        with open(source_filepath, 'r') as source:
            reader = csv.reader(source)
            headers = next(reader)
            # print('headers', headers)
            i=0
            length = len(linenumbers)
            while True:
                if (i in linenumbers):
                    # print('i', i)
                    data = headers
                    writer.writerow(data)
                    length = length-1
                    if(length==0):
                        break
                headers = next(reader)
                i=i+1
        

def main():
    z = zipfile.ZipFile('origin_dataset/features.csv.zip','r')
    z.extract('features.csv', path='origin_dataset/', pwd=None)

    dic = find_word('origin_dataset/text.csv')
    find_in_features('origin_dataset/features.csv', dic)


if __name__ == '__main__':
    main()
