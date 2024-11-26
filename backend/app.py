import os
import random
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


GOOGLE_API_KEY = "AIzaSyDeSKtJBe8Chs4VEtzzObneaoqZlEtskUQ"
GOOGLE_API_URL = "https://kgsearch.googleapis.com/v1/entities:search"


def fetch_random_entity():
    random_queries = ["Technology", "Sports", "Movies", "Famous People", "Science", "Nature", "Animals", "Music", "Art""Technology", "Sports", "Movies", "Famous People", "Science",
    "Nature", "Animals", "Music", "Art", "Books", "History", "Food", "Travel", "Fashion", "Video Games", "Cars", "Countries", "Cities", "Space", "Inventions", "Mythology","Celebrities", "Comics", ]
    query = random.choice(random_queries)

    params = {
        'query': query,
        'limit': 1,
        'indent': True,
        'key': GOOGLE_API_KEY,
    }

    try:
        response = requests.get(GOOGLE_API_URL, params=params)
        response.raise_for_status()  
        data = response.json()
        results = data.get('itemListElement', [])

        if results:
            entity = results[0].get('result', {})
            name = entity.get('name', 'Unknown')
            description = entity.get('description', 'No description available')
            return {
                'name': name,
                'description': description,
                'score': random.randint(1, 1000)  
            }
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  
    except Exception as err:
        print(f"An error occurred: {err}")  
    return None



@app.route('/get-random-entities', methods=['GET'])
def get_random_entities():
    entity1 = fetch_random_entity()
    entity2 = fetch_random_entity()

    
    while entity1 and entity2 and entity1.get('name') == entity2.get('name'):
        entity2 = fetch_random_entity()

    if not entity1 or not entity2:
        return jsonify({'error': 'Failed to fetch valid entities'}), 500

    return jsonify({
        'entity1': entity1,
        'entity2': entity2,
        'score': 0
    })

if __name__ == '__main__':
    app.run(debug=True)
