document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력창

    // 엔터 키를 눌렀을 때 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const messageText = chatMessageInput.textContent.trim(); // 입력된 메시지

            if (messageText !== '') {
                // 메시지 추가
                const newMessageDiv = document.createElement('div');
                newMessageDiv.classList.add('message-row', 'right'); // 보낸 메시지로 설정
                
                const messageBubble = document.createElement('div');
                messageBubble.classList.add('message-bubble', 'blue');
                messageBubble.textContent = messageText;

                newMessageDiv.appendChild(messageBubble);
                messagesDisplay.appendChild(newMessageDiv);

                // 스크롤을 맨 아래로
                messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

                // 입력창 초기화
                chatMessageInput.textContent = ''; // 입력창 초기화
            }
        }
    });

    // '전송' 버튼 클릭 시 메시지 추가
    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', function() {
        const messageText = chatMessageInput.textContent.trim();

        if (messageText !== '') {
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message-row', 'right');

            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', 'blue');
            messageBubble.textContent = messageText;

            newMessageDiv.appendChild(messageBubble);
            messagesDisplay.appendChild(newMessageDiv);

            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
            chatMessageInput.textContent = '';
        }
    });
});
