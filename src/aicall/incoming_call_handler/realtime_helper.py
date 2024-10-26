import asyncio
import websockets
import openai_helper
import json
import logging

logger = logging.getLogger(__name__)

async def stream_transcription(uri, transcriptions_queue):
    """
    Connects to WebSocket URI and processes audio in real-time, putting transcriptions in a queue.
    """
    async with websockets.connect(uri) as websocket:
        while True:
            try:
                # Receiving audio packets and transcribing asynchronously
                transcription = await websocket.recv()
                transcriptions_queue.put_nowait(transcription)
            except websockets.ConnectionClosed as e:
                logger.error(f"WebSocket connection closed: {str(e)}")
                break

async def process_streamed_audio(transcriptions_queue):
    """
    Asynchronously retrieves transcriptions from the queue and generates responses using OpenAI.
    """
    while True:
        transcription = await transcriptions_queue.get()
        
        if transcription:
            # Get GPT response asynchronously
            ai_reply = await openai_helper.get_gpt_response(transcription)
            logger.info(f"AI Response: {ai_reply}")
            
            # Optionally, send the AI response to Twilio or further process it
            # Send response to user (e.g., via Twilio or WebSocket response)

async def handle_real_time_transcription(uri):
    """
    Manages real-time transcription tasks, including connecting to WebSocket and handling audio processing.
    """
    transcriptions_queue = asyncio.Queue()
    await asyncio.gather(
        stream_transcription(uri, transcriptions_queue),
        process_streamed_audio(transcriptions_queue)
    )
