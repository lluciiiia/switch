from flask import Flask, request, jsonify
from twilio.twiml.voice_response import VoiceResponse
import openai

# Initialize Flask App
app = Flask(__name__)

# OpenAI API Key
openai.api_key = "your-openai-api-key"

@app.route("/call-handler", methods=["POST"])
def handle_call():
    # Twilio will send a POST request with call information
    response = VoiceResponse()
    
    # Greeting message from the AI assistant
    response.say("Hello, you are connected to our AI assistant. How can I help you today?")
    
    # Gather speech input from the caller (for AI processing)
    response.gather(input="speech", action="/process-speech", timeout=5)
    
    return str(response)

@app.route("/process-speech", methods=["POST"])
def process_speech():
    # Twilio will send the gathered speech input here
    speech_text = request.form['SpeechResult']
    
    # Call OpenAI GPT to analyze the input and generate a response
    openai_response = openai.Completion.create(
        engine="gpt-3.5-turbo",  # GPT-4 or any model you prefer
        prompt=f"Customer said: {speech_text}. How should I respond?",
        max_tokens=150
    )
    
    ai_reply = openai_response['choices'][0]['text'].strip()
    
    # Generate Twilio response
    response = VoiceResponse()
    
    # AI responds to the customer's inquiry
    response.say(ai_reply)
    
    # If certain conditions are met, transfer to a live agent
    if "lost item" in speech_text.lower() or "cancel" in speech_text.lower():
        response.say("Transferring you to a customer service representative.")
        response.dial("+customer-service-number")  # Replace with customer service number
    
    return str(response)

# Start Flask server
if __name__ == "__main__":
    app.run(port=5000)
