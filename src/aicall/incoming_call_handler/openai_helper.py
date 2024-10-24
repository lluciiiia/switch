# import openai
# import requests
# import os

# # Set OpenAI API Key
# openai.api_key = "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"

# def transcribe_audio():
#     """
#     Download the audio from the given URL and use OpenAI's Whisper model to transcribe it.
#     """
#     # audio_data = requests.get(audio_url).content
    
#     # # Whisper API to transcribe audio to text
#     # transcription = openai.Audio.transcribe("whisper-1", audio_data)
#     # return transcription['text']
#     # Get the current directory
#     current_dir = os.path.dirname(os.path.abspath(__file__))
    
#     # Construct the path to audio.mp3
#     audio_file_path = os.path.join(current_dir, 'audio.mp3')
    
#     # Check if the file exists
#     if not os.path.exists(audio_file_path):
#         raise FileNotFoundError(f"The audio file does not exist at {audio_file_path}")

#     # Open the audio file
#     with open(audio_file_path, 'rb') as audio_file:
#         # Whisper API to transcribe audio to text
#         transcription = openai.Audio.transcribe("whisper-1", audio_file)
    
#     return transcription['text']

# def get_gpt_response(transcribed_text):
#     """
#     Use OpenAI's GPT-4 model to generate a response based on the transcribed text.
#     """
#     # response = openai.Completion.create(
#     #     engine="gpt-4",
#     #     prompt=f"Customer said: {transcribed_text}. How should I respond?",
#     #     max_tokens=150
#     # )
#     # return response['choices'][0]['text'].strip()
#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": f"Customer said: {transcribed_text}. How should I respond?"}
#         ]
#     )
#     return response['choices'][0]['message']['content'].strip()

# def generate_summary(conversation_history):
#     """
#     Generate a summary of the conversation using GPT-4.
#     """
#     # conversation = " ".join(conversation_history)
#     # response = openai.Completion.create(
#     #     engine="gpt-4",
#     #     prompt=f"Summarize this conversation: {conversation}",
#     #     max_tokens=100
#     # )
#     # return response['choices'][0]['text'].strip()
#     conversation = " ".join(conversation_history)
#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant that summarizes conversations."},
#             {"role": "user", "content": f"Summarize this conversation: {conversation}"}
#         ]
#     )
#     return response['choices'][0]['message']['content'].strip()

import openai
import logging
import requests
import io
# Set OpenAI API Key
openai.api_key = "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"

logger = logging.getLogger(__name__)

# def transcribe_audio(audio_content):
#     """
#     Use OpenAI's Whisper model to transcribe audio content.
#     """
#     try:
#         # Use Whisper API to transcribe audio content
#         transcription = openai.Audio.transcribe(model="whisper-1", file=open(audio_content, 'rb'))
#         return transcription['text']
#     except Exception as e:
#         logger.error(f"Error in transcription: {str(e)}")
#         raise

def transcribe_audio(recording_url):
    """
    Use OpenAI's Whisper model to transcribe audio from a URL.
    """
    try:
        # Download the audio file from the URL
        response = requests.get(recording_url)
        if response.status_code != 200:
            logger.error(f"Failed to download audio file: {response.status_code}")
            raise ValueError(f"Failed to download audio from {recording_url}")

        # Create an in-memory file-like object from the audio content
        audio_content = io.BytesIO(response.content)

        # Use Whisper API to transcribe audio content
        transcription = openai.Audio.transcribe(model="whisper-1", file=audio_content)
        return transcription['text']
    except Exception as e:
        logger.error(f"Error in transcription: {str(e)}")
        raise

def get_gpt_response(transcribed_text):
    """
    Use OpenAI's GPT-4 model to generate a response based on the transcribed text.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": """You are an AI assistant handling customer service calls. 
                Be professional, courteous, and helpful. Keep responses concise and clear for voice communication."""},
                {"role": "user", "content": transcribed_text}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        logger.error(f"Error getting GPT response: {str(e)}")
        raise

def generate_summary(conversation_history):
    """
    Generate a summary of the conversation using GPT-4.
    """
    try:
        conversation = " ".join(conversation_history)
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Generate a concise summary of this customer service conversation, highlighting key points and any actions needed."},
                {"role": "user", "content": f"Summarize this conversation: {conversation}"}
            ],
            max_tokens=100
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        logger.error(f"Error generating summary: {str(e)}")
        raise