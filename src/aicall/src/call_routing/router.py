# /src/call_routing/router.py

import json
import openai
from typing import Dict, List

class AICallRouter:
    def __init__(self, api_key: str, rules_file: str):
        self.api_key = api_key
        openai.api_key = api_key
        self.rules = self._load_rules(rules_file)

    def _load_rules(self, rules_file: str) -> Dict:
        with open(rules_file, 'r') as f:
            return json.load(f)

    def _match_keywords(self, inquiry: str) -> str:
        lower_inquiry = inquiry.lower()
        for department, keywords in self.rules['keyword_rules'].items():
            if any(keyword in lower_inquiry for keyword in keywords):
                return department
        return None

    def _ai_classify(self, inquiry: str) -> str:
        prompt = f"Classify the following inquiry into one of these departments: {', '.join(self.rules['departments'])}.\n\nInquiry: {inquiry}\n\nDepartment:"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that classifies inquiries to the correct department."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=50
        )

        return response.choices[0].message['content'].strip()

    def route_call(self, inquiry: str) -> str:
        # First, try keyword matching
        department = self._match_keywords(inquiry)
        
        # If no match, use AI classification
        if not department:
            department = self._ai_classify(inquiry)
        
        # If still no match, route to default department
        if department not in self.rules['departments']:
            department = self.rules['default_department']
        
        return department