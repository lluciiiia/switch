import openai
import logging
import requests
import io
import os
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv


load_dotenv()  # Load environment variables from .env file

# Set OpenAI API Key
openai.api_key = os.getenv('OPENAI_API_KEY')
account_sid = os.getenv('TWILIO_ACCOUNT_SID')  # Replace with your Twilio Account SID
auth_token = os.getenv('TWILIO_AUTH_TOKEN')      # Replace with your Twilio Auth Token

logging.basicConfig(level=logging.INFO)
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
        recording_url_mp3 = f"{recording_url}.mp3"
        # Download the audio file from the URL
        response = requests.get(recording_url_mp3, auth=(account_sid, auth_token)) # this code over here, i am getting 443 error
        # when i run the url on postman its working fine
        # could it be the connection between twilio and page kite?
        if response.status_code != 200:
            raise ValueError(f"Failed to download audio from {recording_url_mp3}", response)

        # Create an in-memory file-like object from the audio content
        audio_content = io.BytesIO(response.content)
        audio_content.name = "audio.mp3"  # Set a dummy name attribute
        # Use Whisper API to transcribe audio content
        transcription = openai.Audio.transcribe(model="whisper-1", file=audio_content)
        return transcription['text']
    except requests.exceptions.RequestException as req_err:
        logger.error(f"Request error downloading audio file: {str(req_err)}")
        raise
    except Exception as e:
        logger.error(f"General error in transcription: {str(e)}")
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