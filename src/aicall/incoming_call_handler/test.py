from twilio.rest import Client
from dotenv import load_dotenv
import requests
import os

# Load environment variables from .env file
load_dotenv()

def download_recording_twilio(recording_sid):
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    
    # Check if the credentials are loaded
    if not account_sid or not auth_token:
        raise ValueError("Twilio credentials are not set. Please check your .env file.")

    client = Client(account_sid, auth_token)

    # Get the recording
    recording = client.recordings(recording_sid).fetch()
    
    # Construct the complete URL for the recording
    recording_url = f"https://api.twilio.com{recording.uri}"  # Combine the base URL with the URI

    # Download the audio file
    response = requests.get(recording_url, auth=(account_sid, auth_token))
    print(response.content)
    if response.status_code == 200:
        with open(f"{recording_sid}.mp3", "wb") as audio_file:
            audio_file.write(response.content)
        print(f"Downloaded recording: {recording_sid}.mp3")
    else:
        print(f"Failed to download recording: {response.status_code} - {response.text}")

# Example usage
download_recording_twilio("RE94eb2775eb99bdad6fd6211793e0c925")
