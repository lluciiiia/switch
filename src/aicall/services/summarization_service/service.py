# /services/summarization_service/service.py

import json
from datetime import datetime
from pathlib import Path
from src.aicall.src.summarization.summarizer import AISummarizer
from typing import List, Dict
class SummarizationService:
    def __init__(self, api_key: str, summaries_dir: str):
        self.summarizer = AISummarizer(api_key)
        self.summaries_dir = Path(summaries_dir)
        self.summaries_dir.mkdir(parents=True, exist_ok=True)

    def process_call(self, call_id: str, conversation: List[Dict[str, str]]):
        summary = self.summarizer.generate_summary(conversation)
        self._save_summary(call_id, summary)
        return summary

    def process_inquiry_history(self, resident_id: str, history: List[Dict[str, str]]):
        summary = self.summarizer.generate_inquiry_history_summary(history)
        self._save_summary(f"{resident_id}_history", summary)
        return summary

    def _save_summary(self, identifier: str, summary: str):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{identifier}_{timestamp}.json"
        filepath = self.summaries_dir / filename
        
        with open(filepath, 'w') as f:
            json.dump({"summary": summary, "timestamp": timestamp}, f)

# Usage example
if __name__ == "__main__":
    api_key = "your-openai-api-key"
    summaries_dir = "/data/summaries"
    
    service = SummarizationService(api_key, summaries_dir)
    
    # Example call summarization
    call_conversation = [
        {"role": "caller", "content": "Hi, I'm having issues with my water bill."},
        {"role": "agent", "content": "I'm sorry to hear that. Can you provide more details about the issue?"},
        {"role": "caller", "content": "The bill seems much higher than usual, and I haven't used more water than normal."},
        {"role": "agent", "content": "I understand. Let's review your usage history and check for any anomalies."}
    ]
    call_summary = service.process_call("call_123", call_conversation)
    print("Call Summary:", call_summary)

    # Example inquiry history summarization
    inquiry_history = [
        {"date": "2023-01-15", "inquiry": "Requested information about recycling program"},
        {"date": "2023-03-22", "inquiry": "Reported a pothole on Main Street"},
        {"date": "2023-06-10", "inquiry": "Asked about summer community events"}
    ]
    history_summary = service.process_inquiry_history("resident_456", inquiry_history)
    print("Inquiry History Summary:", history_summary)