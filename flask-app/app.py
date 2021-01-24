from flask import Flask, render_template, request, redirect, url_for, session
import numpy as np
import w2v
import data

app = Flask(__name__)

app.secret_key =b'g#f8spIoiycau[pZ:SL'

responses = {};
@app.route('/', methods=["POST", "GET"])
def index():
    if request.method == "POST":
        for idx in range(w2v.NUM_IMGS):
            new_input = request.form[f'content{idx+1}'].split(", ")
            if len(new_input) < w2v.NUM_IMGS: 
                return redirect('/')
            responses[idx] = new_input
        matches = w2v.findMatches(responses, data.responses_history)
        session['matches'] = matches
        return redirect(url_for('result', matches=matches))
    else:
        return render_template('index.html')


@app.route('/result')
def result():
    matches = session.get('matches', None)
    best_match = matches[0]
    response_dists = np.array(list(best_match[2].values()))
    response_scores = [np.round(100*(1-score), 1) for score in response_dists]
    return render_template('result.html', 
        match_ID=best_match[0],
        match_score=np.round(100*(1-best_match[1]), 1),
        response_scores=response_scores,
        your_words=responses,
        match_words=data.responses_history[best_match[0]][1]
    )

if __name__ == "__main__":
    app.run(debug=True)