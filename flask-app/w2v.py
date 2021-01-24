import gensim
import numpy as np
from gensim.models import Word2Vec
from gensim.models.keyedvectors import KeyedVectors
from scipy.spatial import distance

glove = KeyedVectors.load_word2vec_format("data/glove.6B.50d.txt.w2v", binary=False)

NUM_IMGS = 3

def computeDistances(word_dict1, word_dict2):
    # Computes response distances for ink blot responses represented by dictionary entries in 
    # `word_dict1` and `word_dict2` where responses with the same ID (dictionary key) are compared.
    # Returns dictionary mapping ID to response distance.
    img_dists = {}
    for idx in range(NUM_IMGS):
        lst1 = word_dict1[idx]
        lst2 = word_dict2[idx]

        avg1 = np.average(np.array([glove[word] for word in lst1]), axis=0)
        avg2 = np.average(np.array([glove[word] for word in lst2]), axis=0)
        avg_dist = distance.cosine(avg1, avg2)

        word_dists = []
        for word1 in lst1:
            for word2 in lst2:
                word_dists.append(distance.cosine(glove[word1], glove[word2]))  
        closest_dist = np.min(word_dists)
        
        img_dists[idx] = 0.75*avg_dist + 0.25*closest_dist
    return img_dists

def accumulateDistances(response_dict):
    # Computes the average response distance
    return np.average(list(response_dict.values()))

def findMatches(responses, responses_history):
    # Finds the ID of the response in the history that is the closest match
    # to the current response
    response_dists = []
    for ID, h in responses_history:
        dists = computeDistances(responses, h)
        avg = accumulateDistances(dists)
        response_dists.append((ID, avg, dists))
    response_dists.sort(key=lambda r: r[1])
    return response_dists