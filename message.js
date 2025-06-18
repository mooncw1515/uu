document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력된 텍스트 (노래 부분)
    const sendButton = document.querySelector('.send-button'); // 전송 버튼

    sendButton.addEventListener('click', function() {
        const messageText = getFullMessage(); // 전체 메시지 가져오기

        if (messageText !== '') {
            // 메시지 추가
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message-row', 'right'); // 보낸 메시지

            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', 'blue');
            messageBubble.textContent = messageText;

            newMessageDiv.appendChild(messageBubble);
            messagesDisplay.appendChild(newMessageDiv);

            // 스크롤을 맨 아래로
            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
            chatMessageInput.textContent = ''; // 입력창 초기화
        }
    });

    function getFullMessage() {
        // 전체 메시지에서 editable 부분을 포함하여 완성된 메시지 가져오기
        const editableText = chatMessageInput.textContent.trim();
        // 기본 문장과 합침
        return `아 혹시 저번에 너네 집에서 ${editableText} 들었을 때 났던 향 기억나?`;
    }
});
