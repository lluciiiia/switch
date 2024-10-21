import openai
import requests

openai.api_key = "your-openai-api-key"

def transcribe_audio(audio_url):
    # Download audio from Twilio
    audio_data = requests.get(audio_url).content
    
    # Whisper API to transcribe audio to text
    transcription = openai.Audio.transcribe("whisper-1", audio_data)
    return transcription['text']

def generate_summary(conversation_history):
    # Call OpenAI API to summarize the conversation
    openai_response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=f"Summarize this conversation: {conversation_history}",
        max_tokens=100
    )
    summary = openai_response['choices'][0]['text'].strip()
    return summary

@app.route("/process-speech", methods=["POST"])
def process_speech():
    # Get the recording URL from Twilio
    recording_url = request.form['RecordingUrl']
    
    # Transcribe audio using Whisper
    transcribed_text = transcribe_audio(recording_url)
    
    # Call GPT for response generation
    openai_response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=f"Customer said: {transcribed_text}. How should I respond?",
        max_tokens=150
    )
    
    ai_reply = openai_response['choices'][0]['text'].strip()
    
    # Respond via Twilio Voice
    response = VoiceResponse()
    response.say(ai_reply)

    # Gather customer speech
    speech_text = request.form['SpeechResult']
    
    # Maintain conversation history
    conversation_history.append(speech_text)
    
    # AI responds
    ai_reply = get_gpt_response(speech_text)
    response.say(ai_reply)
    
    # Check for transfer condition
    if is_transfer_required(speech_text):
        # Generate a summary before transferring
        summary = generate_summary(conversation_history)
        notify_agent(summary)
        response.say("Transferring to a customer service representative.")
        response.dial("+customer-service-number")
    
    # Check for keywords for call transfer
    if "lost item" in transcribed_text.lower() or "cancel" in transcribed_text.lower():
        response.say("Transferring you to a customer service representative.")
        response.dial("+customer-service-number") # Replace with a real number
    
    return str(response)
