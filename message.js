// message.js

// DOMContentLoaded는 HTML 문서가 완전히 로드되고 파싱된 후에 스크립트를 실행하도록 합니다.
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 식별 조건문이 제거되었습니다.
    // 이 파일은 message.html (또는 main.html)에서만 사용될 것으로 가정합니다.

    const messagesDisplay = document.getElementById('messagesDisplay');
    const chatMessageInput = document.getElementById('chatMessageInput');

    // 초기 입력창 placeholder 설정
    chatMessageInput.placeholder = '아 혹시 저번에 너네 집에서 <노래> 들었을 때 났던 향 기억나?';

    // 입력창에 엔터를 쳤을 때 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const messageText = chatMessageInput.value.trim();

            if (messageText !== '') {
                // 새로운 메시지 요소 생성
                const newMessageDiv = document.createElement('div');
                newMessageDiv.classList.add('message', 'sent'); // 보낸 메시지로 설정
                const newParagraph = document.createElement('p');
                newParagraph.textContent = messageText;
                newMessageDiv.appendChild(newParagraph);

                // 메시지 목록에 추가
                messagesDisplay.appendChild(newMessageDiv);

                // 스크롤을 최하단으로 이동
                messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

                // 입력창 초기화 및 다음 placeholder 설정 (예시)
                chatMessageInput.value = '';
                // 다음 대화 흐름에 따라 placeholder를 변경하거나 비울 수 있습니다.
                chatMessageInput.placeholder = '';
            }
        }
    });
});
