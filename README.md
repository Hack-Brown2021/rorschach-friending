# rorschach-friending

## Context
The transition to remote learning means that students are all too familiar with rounds and rounds of awkward zoom calls during orientation in an attempt to make friends. The same questions are asked every time: How are classes? What dorm are you in? How’s the food? Rory is the result of our efforts to match you with a new friend in a fun way that ensures you’ll have something to talk about.

## How it works
1. Meet Rory and create an account
2. Describe what you see for each inkblot drawing shown
3. Rory will analyze your responses and give you the contact info for the person in our database that is the most similar to you, along with a summary of both your responses.

## How we made Rory
To calculate similarity, we used pre-trained GloVe Word Embeddings to encode the semantic meaning of the inputted words and obtain a vector representation of the words. We used cosine distance to calculate various metrics that we accumulated to represent the overall similarity between two users' responses. We used Express.js for our web server and used Handlebars to render HTML templates for the UI on the server side. To store user data, we used a PostgreSQL database and connected it to our JavaScript code via the Sequelize ORM.

## [Video](https://youtu.be/mquCNPs5EPg)
