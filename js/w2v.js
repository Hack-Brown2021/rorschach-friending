console.log('ml5 version:', ml5.version);
const w2v = ml5.word2vec('../data/wordvecs10000.json', modelLoaded);
function modelLoaded() {console.log('model loaded')}

w2v.loadModel

const NUM_IMGS = 3;

function computeDistances(word_dict1, word_dict2) {
    /*  Computes response distances for ink blot responses represented by dictionary entries in 
        `word_dict1` and `word_dict2` where responses with the same ID (dictionary key) are compared.
        Returns dictionary mapping ID to response distance.
    */
    const img_dists = {};
    for (var idx = 0; idx < NUM_IMGS; idx++) {
        const lst1 = word_dict1[idx];
        const lst2 = word_dict2[idx];
        console.log(lst1);
        console.log(lst2);

        const avg1 = w2v.average(lst1, max=1)
        const avg2 = w2v.average(lst2, max=1)
        var word1 = ""
        var word2 = ""
        avg1.then((value) => {
            word1 = value[0].word
            console.log(word1)
        }).catch((value) => {
            alert("Invalid word entered.")
        });
        avg2.then((value) => {
            word2 = value[0].word
            console.log(word2)
        }).catch((value) => {
            alert("Invalid word entered.")
        });
        console.log(word1)
        console.log(word2)
        const avg_dist = w2v.nearestFromSet(word1, [word2]);
        console.log(avg_dist)
        

        const closest_word_dists = new Array();
        lst1.forEach(function(item, index){
            closest_word_dists.push(w2v.nearestFromSet(item, lst2).distance);
        })
        const closest_dist = Math.min(...closest_word_dists);
        img_dists[idx] = 0.75*avg_dist + 0.25*closest_dist
    }
    return img_dists
}

function accumulateDistances(response_dict) {
    /*  Computes the average response distance */
    var sum = 0;
    for (var key in response_dict){
        sum += response_dict[key];
    }
    return sum / Object.keys(response_dict).length;
}

const responses1 = {
    0: ["cat", "lion", "flower", "wolf", "desert"],
    1: ["rain", "water", "drop", "sink", "sad"],
    2: ["heart", "love", "sun", "ball", "daytime"]
}

const responses2 = {
    0: ["flower", "daisy", "horse", "tiger", "wild"],
    1: ["rainy", "wet", "chilly", "shower", "spring"],
    2: ["red", "lonely", "alone", "sad", "friend"]
}

const response_dict = computeDistances(responses1, responses2);
const dist = accumulateDistances(response_dict);
//console.log('Response Dictionary: ' + response_dict);
//console.log('Accumulated Distance: ' + dist);