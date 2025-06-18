document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력창
    const sendButton = document.querySelector('.send-button'); // 전송 버튼

    // 엔터 키를 눌렀을 때 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let messageText = getFirstMessage(); // 첫 번째 메시지 가져오기

            if (messageText !== '') {
                // 메시지 추가
                addMessage(messageText);

                // 입력창을 두 번째 텍스트로 변경
                chatMessageInput.textContent = ' <가수>?이 부른 거였는데...'; // 입력창 텍스트 변경
            }
        }
    });

    // '전송' 버튼 클릭 시 첫 번째 메시지 추가
    sendButton.addEventListener('click', function() {
        let messageText = getFirstMessage(); // 첫 번째 메시지 가져오기

        if (messageText !== '') {
            addMessage(messageText);

            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
            chatMessageInput.textContent = ''; // 입력창 초기화

            // 두 번째 텍스트로 변경
            chatMessageInput.textContent = ' <가수>?이 부른 거였는데...'; // 입력창 텍스트 변경
        }
    });

    // 첫 번째 메시지 생성 함수
    function getFirstMessage() {
        const editableText = chatMessageInput.textContent.trim(); // 노래 부분
        return `아 혹시 저번에 너네 집에서 ${editableText} 들었을 때 났던 향 기억나?`;
    }

    // 메시지 추가 함수 (보낸 메시지로 추가)
    function addMessage(messageText) {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.classList.add('message-row', 'right'); // 보낸 메시지로 설정
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'blue');
        messageBubble.textContent = messageText;

        newMessageDiv.appendChild(messageBubble);
        messagesDisplay.appendChild(newMessageDiv);

        messagesDisplay.scrollTop = messagesDisplay.scrollHeight; // 스크롤을 맨 아래로
    }
});
