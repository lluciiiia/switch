import openai
import requests
import os

# Set OpenAI API Key
openai.api_key = "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"

def transcribe_audio():
    """
    Download the audio from the given URL and use OpenAI's Whisper model to transcribe it.
    """
    # audio_data = requests.get(audio_url).content
    
    # # Whisper API to transcribe audio to text
    # transcription = openai.Audio.transcribe("whisper-1", audio_data)
    # return transcription['text']
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the path to audio.mp3
    audio_file_path = os.path.join(current_dir, 'audio.mp3')
    
    # Check if the file exists
    if not os.path.exists(audio_file_path):
        raise FileNotFoundError(f"The audio file does not exist at {audio_file_path}")

    # Open the audio file
    with open(audio_file_path, 'rb') as audio_file:
        # Whisper API to transcribe audio to text
        transcription = openai.Audio.transcribe("whisper-1", audio_file)
    
    return transcription['text']

def get_gpt_response(transcribed_text):
    """
    Use OpenAI's GPT-4 model to generate a response based on the transcribed text.
    """
    # response = openai.Completion.create(
    #     engine="gpt-4",
    #     prompt=f"Customer said: {transcribed_text}. How should I respond?",
    #     max_tokens=150
    # )
    # return response['choices'][0]['text'].strip()
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Customer said: {transcribed_text}. How should I respond?"}
        ]
    )
    return response['choices'][0]['message']['content'].strip()

def generate_summary(conversation_history):
    """
    Generate a summary of the conversation using GPT-4.
    """
    # conversation = " ".join(conversation_history)
    # response = openai.Completion.create(
    #     engine="gpt-4",
    #     prompt=f"Summarize this conversation: {conversation}",
    #     max_tokens=100
    # )
    # return response['choices'][0]['text'].strip()
    conversation = " ".join(conversation_history)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes conversations."},
            {"role": "user", "content": f"Summarize this conversation: {conversation}"}
        ]
    )
    return response['choices'][0]['message']['content'].strip()