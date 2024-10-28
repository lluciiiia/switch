from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.voice_response import VoiceResponse
import openai_helper
import twilio_helper
from dotenv import load_dotenv
import os


load_dotenv()
phone_number = os.getenv("PHONENUMBER")

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
    response.say("Hello, you are connected to Life's AI assistant. How can I assist you today?", voice="Polly.Joanna")
    response.pause(length=5, play_beep=True) # Hi, I would like to book a room
    response.say("Hello! That's fantastic news! We're thrilled to host you. To make a reservation, please visit our official website or use the Discover ASR app for the most streamlined experience. If you have any questions or special requests, feel free to ask. We're here to assist you 24/7!", voice="Polly.Joanna")
    response.record(timeout=5, action='/handle-recording', play_beep=False, transcribe=True) # This is where Twilio will send the recording results
    # Set timeout to 5 seconds for silence
    # response.record(action="/process-speech", timeout=5, transcribe=True)
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
            response.dial(os.getenv("PHONENUMBER"))

        return str(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/handle-recording", methods=["POST"])
def handle_recording():
    print("Recording handler triggered")
    
    # Get the transcription
    transcribed_text = request.values.get('TranscriptionText', '')
    print(f"Transcribed text: {transcribed_text}")  # Debug print
    
    response = VoiceResponse()
    
    # Example of handling different transcribed texts
    transcribed_text = transcribed_text.lower()
    count = 0
    
    if "booking" in transcribed_text or "reserve" in transcribed_text:
        response.say("I understand you want to make a booking. Let me help you with that.", voice="Polly.Joanna")
        response.say("Please provide your preferred check-in date and duration of stay.", voice="Polly.Joanna")
        # Record again for the next response
        response.record(action='/handle-booking-details', timeout=5, play_beep=True, transcribe=True)
        
    elif "price" in transcribed_text or "cost" in transcribed_text:
        response.say("Our room rates vary depending on the season and room type. Standard rooms start at $100 per night.", voice="Polly.Joanna")
        response.pause(length=1)
        response.say("Would you like to know more about our room types?", voice="Polly.Joanna")
        response.record(action='/handle-room-inquiry', timeout=5, play_beep=True, transcribe=True)
        
    elif "complaint" in transcribed_text or "problem" in transcribed_text or "issue" in transcribed_text:
        response.say("I'm sorry to hear you're having an issue. Let me connect you with our customer service team.", voice="Polly.Joanna")
        response.dial(os.getenv("PHONENUMBER"))
    elif count == 0:
        response.say("I'm sorry to hear you're having an issue. Let me connect you with our customer service team.", voice="Polly.Joanna")
        print(f"Attempting to dial: {phone_number}")
        response.dial(phone_number, timeout=30)
    else:
        response.say("Thank you for your message. Let me respond to that.", voice="Polly.Joanna")
        response.say("Is there anything specific you'd like to know about our services?", voice="Polly.Joanna")
        response.record(action='/handle-followup', timeout=5, play_beep=True, transcribe=True)
    
    return str(response)

@app.route("/handle-booking-details", methods=["POST"])
def handle_booking_details():
    transcribed_text = request.values.get('TranscriptionText', '')
    print(f"Booking details: {transcribed_text}")
    
    response = VoiceResponse()
    response.say("Thank you for providing those details. To complete your booking, I'll connect you with our reservation team.", voice="Polly.Joanna")
    
    response.dial(os.getenv("PHONENUMBER"))
    return str(response)

@app.route("/handle-room-inquiry", methods=["POST"])
def handle_room_inquiry():
    transcribed_text = request.values.get('TranscriptionText', '')
    print(f"Room inquiry: {transcribed_text}")
    
    response = VoiceResponse()
    if "yes" in transcribed_text.lower():
        response.say("We offer Standard, Deluxe, and Suite rooms. Each comes with different amenities.", voice="Polly.Joanna")
        response.say("Would you like me to connect you with our reservation team for more details?", voice="Polly.Joanna")
        response.record(action='/handle-reservation-request', timeout=5, play_beep=True, transcribe=True)
    else:
        response.say("Thank you for your interest. Is there anything else I can help you with?", voice="Polly.Joanna")
        response.record(action='/handle-followup', timeout=5, play_beep=True, transcribe=True)
    return str(response)

@app.route("/handle-followup", methods=["POST"])
def handle_followup():
    transcribed_text = request.values.get('TranscriptionText', '')
    print(f"Followup: {transcribed_text}")
    
    response = VoiceResponse()
    if "no" in transcribed_text.lower() or "bye" in transcribed_text.lower():
        response.say("Thank you for contacting us. Have a great day!", voice="Polly.Joanna")
        response.hangup()
    else:
        # Route back to main handler for new inquiries
        return handle_recording()
    return str(response)


if __name__ == "__main__":
    app.run(port=5000, debug=True)