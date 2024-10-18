# /services/routing_service/service.py

import logging
from src.call_routing.router import AICallRouter
from typing import Dict

class RoutingService:
    def __init__(self, api_key: str, rules_file: str):
        self.router = AICallRouter(api_key, rules_file)
        self.logger = logging.getLogger(__name__)

    def process_call(self, call_id: str, inquiry: str) -> Dict[str, str]:
        self.logger.info(f"Processing call {call_id}")
        
        try:
            department = self.router.route_call(inquiry)
            self.logger.info(f"Call {call_id} routed to {department}")
            
            return {
                "call_id": call_id,
                "department": department,
                "status": "routed"
            }
        except Exception as e:
            self.logger.error(f"Error routing call {call_id}: {str(e)}")
            return {
                "call_id": call_id,
                "department": self.router.rules['default_department'],
                "status": "error"
            }

# Usage example
if __name__ == "__main__":
    api_key = "your-openai-api-key"
    rules_file = "/config/routing_rules/rules.json"
    
    service = RoutingService(api_key, rules_file)
    
    # Example calls
    inquiries = [
        "I have a question about my water bill",
        "There's a pothole on my street that needs fixing",
        "When is the next city council meeting?",
        "I need to report a noise complaint"
    ]
    
    for i, inquiry in enumerate(inquiries):
        result = service.process_call(f"call_{i+1}", inquiry)
        print(f"Call {i+1} Result:", result)
