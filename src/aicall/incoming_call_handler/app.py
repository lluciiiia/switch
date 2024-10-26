from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.voice_response import VoiceResponse
import openai_helper
import twilio_helper
import whisper
import requests
import os
import ssl
import certifi
import urllib.request

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
    recording_url = request.form.get('RecordingUrl')
    # Check if recording_url is None or empty
    if not recording_url:
        return jsonify({"error": "Recording URL is missing."}), 400  # {{ edit_1 }}
    
    transcribed_text = openai_helper.transcribe_audio(recording_url)  # {{ edit_2 }}
    conversation_history.append(transcribed_text)
    ai_reply = openai_helper.get_gpt_response(transcribed_text)
    
    response = VoiceResponse()
    response.say(ai_reply)
    
    if twilio_helper.is_transfer_required(transcribed_text):
        summary = openai_helper.generate_summary(conversation_history)
        twilio_helper.notify_agent(summary)
        response.say("Transferring you to a customer service representative.")
        response.dial("+6593397218")
    # try:
    #     transcribed_text = openai_helper.transcribe_audio()
    #     ai_reply = openai_helper.get_gpt_response(transcribed_text)

    #     return jsonify({
    #         "transcription": transcribed_text,
    #         "ai_response": ai_reply
    #     }), 200
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    
    return str(response)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
