from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.voice_response import VoiceResponse
import openai_helper
import twilio_helper
import asyncio
import realtime_helper

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Placeholder for storing conversation history
conversation_history = []

# Root route to confirm app is running
@app.route("/", methods=["GET"])
def index():
    return "AI Call Handling System is running!"

@app.route("/call-handler", methods=["POST"])
def handle_call():
    print("Call handler triggered")  # Debug print
    response = VoiceResponse()
    response.say("Hello, you are connected to Lyf's AI assistant. How can I assist you today?")
    # Set timeout to 5 seconds for silence
    response.record(action="/process-speech", timeout=5, transcribe=True)
    return str(response)

@app.route("/process-speech", methods=["POST"])
def process_speech():
    recording_sid = request.form.get('RecordingSid')
    
    try:
        # Get transcribed text from Twilio
        transcribed_text = openai_helper.transcribe_audio(recording_sid)
        conversation_history.append(transcribed_text)
        
        # Get AI response based on the transcribed text
        ai_reply = openai_helper.get_gpt_response(transcribed_text)
        
        response = VoiceResponse()
        response.say(ai_reply)
        
        if twilio_helper.is_transfer_required(transcribed_text):
            summary = openai_helper.generate_summary(conversation_history)
            twilio_helper.notify_agent(summary)
            response.say("Transferring you to a customer service representative.")
            response.dial("+6593397218")

        return str(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/start-stream", methods=["POST"])
def start_stream():
    """
    Initiates real-time transcription via WebSocket for near real-time interaction.
    """
    websocket_uri = request.json.get('websocket_uri')
    if not websocket_uri:
        return jsonify({"error": "Missing WebSocket URI"}), 400
    
    asyncio.run(realtime_helper.handle_real_time_transcription(websocket_uri))
    return jsonify({"status": "Streaming started"}), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
