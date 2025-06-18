document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력창

    // 엔터 키를 눌렀을 때 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const messageText = getFullMessage(); // 전체 메시지 가져오기

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
        const messageText = getFullMessage(); // 전체 메시지 가져오기

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

    // 전체 메시지를 가져오는 함수
    function getFullMessage() {
        // editableText는 사용자가 수정한 부분
        const editableText = chatMessageInput.textContent.trim();
        // 기본 문장과 합침
        return `아 혹시 저번에 너네 집에서 ${editableText} 들었을 때 났던 향 기억나?`;
    }
});
