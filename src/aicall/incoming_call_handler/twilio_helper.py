def is_transfer_required(transcribed_text):
    """
    Check if the transcribed text contains keywords that require a transfer to customer service.
    """
    keywords = ["lost item", "cancel", "issue", "problem"]
    for keyword in keywords:
        if keyword in transcribed_text.lower():
            return True
    return False

def notify_agent(summary):
    """
    Notify a customer service agent by sending them the summarized conversation.
    """
    # Example: Log the summary (you can replace this with an API call to notify the agent)
    print(f"Notification to agent: {summary}")

# Additional logic can be added here, such as sending a notification via email or a chat system
