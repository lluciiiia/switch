# /src/summarization/summarizer.py

import openai
from typing import List, Dict

class AISummarizer:
    def __init__(self, api_key: str):
        openai.api_key = api_key

    def generate_summary(self, conversation: List[Dict[str, str]]) -> str:
        # Prepare the conversation for the API
        formatted_convo = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation])
        
        prompt = f"Please summarize the following conversation:\n\n{formatted_convo}\n\nSummary:"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes conversations."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )

        return response.choices[0].message['content'].strip()

    def generate_inquiry_history_summary(self, history: List[Dict[str, str]]) -> str:
        formatted_history = "\n".join([f"Date: {entry['date']}, Inquiry: {entry['inquiry']}" for entry in history])
        
        prompt = f"Please summarize the following inquiry history:\n\n{formatted_history}\n\nSummary:"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes inquiry histories."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
        )

        return response.choices[0].message['content'].strip()