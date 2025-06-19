document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const inputBar = document.querySelector('.input-bar'); // 전체 입력바 div
    let currentInputState = 0; // 0: 첫 번째 문장, 1: 두 번째 문장

    // 메시지를 추가하고 입력창을 업데이트하는 함수
    function sendMessage() {
        const messageText = inputBar.textContent.trim(); // .input-bar 전체의 텍스트를 가져옴

        if (messageText !== '') {
            // 1. 메시지 추가
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message-row', 'right'); 
            
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', 'blue');
            messageBubble.textContent = messageText;

            newMessageDiv.appendChild(messageBubble);
            messagesDisplay.appendChild(newMessageDiv);

            // 스크롤을 맨 아래로
            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

            // 2. 입력창 내용 변경 및 상태 업데이트
            if (currentInputState === 0) {
                // 첫 번째 메시지 전송 후, 두 번째 문장으로 변경
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text">가수</span>?이 부른 거였는데..';
                currentInputState = 1; // 상태를 두 번째 문장으로 변경
            } else {
                // 두 번째 메시지 전송 후, 입력창을 비웁니다 (원하면 다른 문장으로 바꿀 수도 있습니다)
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text">메시지를 입력하세요...</span>';
                // 여기에서 currentInputState를 다시 0으로 리셋하거나, 다른 상태로 관리할 수 있습니다.
                // 예: currentInputState = 0; // 첫 번째 문장으로 다시 돌아가려면
            }
            
            // 3. 새로 생성된 editable-text 요소에 포커스 및 커서 이동
            const newEditableText = inputBar.querySelector('.editable-text');
            if (newEditableText) {
                newEditableText.focus();
                // 커서를 텍스트 끝으로 이동 (사용자 편의성)
                const range = document.createRange();
                const sel = window.getSelection();
                // newEditableText.childNodes[0]은 실제 텍스트 노드
                // newEditableText.childNodes[0].length는 해당 텍스트의 길이
                if (newEditableText.childNodes.length > 0 && newEditableText.childNodes[0].nodeType === Node.TEXT_NODE) {
                    range.setStart(newEditableText.childNodes[0], newEditableText.childNodes[0].length);
                } else {
                    range.setStart(newEditableText, 0); // 텍스트 노드가 없는 경우 (예: 완전히 비어있는 editable-text)
                }
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    // 엔터 키를 눌렀을 때 메시지 추가
    inputBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터 키의 기본 동작(줄바꿈) 방지
            sendMessage();
        }
    });

    // '전송' 버튼 클릭 시 메시지 추가
    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
});
