import openai
import logging
import requests
import os
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
from twilio.rest import Client


load_dotenv()  # Load environment variables from .env file

# Set OpenAI API Key
openai.api_key = os.getenv('OPENAI_API_KEY')
account_sid = os.getenv('TWILIO_ACCOUNT_SID')  # Replace with your Twilio Account SID
auth_token = os.getenv('TWILIO_AUTH_TOKEN')      # Replace with your Twilio Auth Token

client = Client(account_sid, auth_token)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def transcribe_audio(recording_sid):
    """
    Retrieve the transcription from Twilio for the specified recording SID.
    """
    try:
        # Fetch the recording details
        recording = client.recordings(recording_sid).fetch()
        
        # Fetch transcription details
        transcription_url = f"https://api.twilio.com{recording.subresource_uris['transcriptions']}"
        transcription_response = requests.get(transcription_url, auth=HTTPBasicAuth(account_sid, auth_token))

        if transcription_response.status_code != 200:
            raise ValueError(f"Failed to fetch transcriptions from {transcription_url}", transcription_response)

        transcription_data = transcription_response.json()

        # Extract the transcription text
        if transcription_data['transcriptions']:
            transcription_text = transcription_data['transcriptions'][0]['transcription_text']
        else:
            transcription_text = "No transcription available"

        return transcription_text
    except requests.exceptions.RequestException as req_err:
        logger.error(f"Request error fetching transcription: {str(req_err)}")
        raise
    except Exception as e:
        logger.error(f"General error in transcription: {str(e)}")
        raise

def get_gpt_response(transcribed_text):
    """
    Use OpenAI's GPT-4 model to generate a response based on the transcribed text.
    """
    try:
        # Load role content from a text file
        with open('role_content.txt', 'r') as file:
            role_content = file.read().strip()

        # Create the GPT response using the role content from the text file
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": role_content},
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
