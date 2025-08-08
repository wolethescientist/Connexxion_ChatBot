document.addEventListener('DOMContentLoaded', () => {
    const scriptTag = document.querySelector('script[data-chatbot-id]');
    if (!scriptTag) {
        console.error('Chatbot script tag with data-chatbot-id not found.');
        return;
    }

    const chatbotId = scriptTag.getAttribute('data-chatbot-id');
    const chatBubbleText = scriptTag.getAttribute('data-bubble-text') || 'Chat with us!';
    const primaryColor = scriptTag.getAttribute('data-primary-color') || '#007bff';

    if (!chatbotId) {
        console.error('data-chatbot-id attribute is missing.');
        return;
    }

    // Create chat bubble
    const chatBubble = document.createElement('div');
    chatBubble.id = 'connexxion-chat-bubble';
    chatBubble.textContent = chatBubbleText;
    document.body.appendChild(chatBubble);

    // Create chat iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'connexxion-iframe-container';
    document.body.appendChild(iframeContainer);

    // Create chat iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'connexxion-chat-iframe';
    iframe.src = `${window.location.origin}/embed/${chatbotId}`;
    iframe.style.border = 'none';
    iframeContainer.appendChild(iframe);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.id = 'connexxion-close-button';
    closeButton.innerHTML = '&times;';
    iframeContainer.appendChild(closeButton);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #connexxion-chat-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: ${primaryColor};
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-family: sans-serif;
            font-size: 16px;
            z-index: 9998;
            transition: all 0.3s ease;
        }
        #connexxion-chat-bubble:hover {
            transform: scale(1.05);
        }
        #connexxion-iframe-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 90%;
            max-width: 400px;
            height: 70%;
            max-height: 600px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 9999;
            transition: all 0.3s ease;
            transform-origin: bottom right;
        }
        #connexxion-chat-iframe {
            width: 100%;
            height: 100%;
        }
        #connexxion-close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.3);
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 20px;
            line-height: 30px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    chatBubble.addEventListener('click', () => {
        iframeContainer.style.display = 'flex';
        chatBubble.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        iframeContainer.style.display = 'none';
        chatBubble.style.display = 'block';
    });
});
