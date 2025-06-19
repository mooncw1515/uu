document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const inputBar = document.querySelector('.input-bar'); // 전체 입력바 div (textContent를 가져올 때 사용)
    let chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력창 (contenteditable span)

    // 메시지를 추가하고 입력창을 업데이트하는 함수
    function sendMessage() {
        // 현재 inputBar 안의 전체 텍스트를 가져옵니다.
        // 예를 들어 "가수?이 부른 거였는데.."에서 '가수'를 수정했으면 수정된 전체 문장이 됩니다.
        const messageText = inputBar.textContent.trim(); 

        if (messageText !== '') {
            // 1. 메시지 추가 (이전과 동일)
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message-row', 'right');
            
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', 'blue');
            messageBubble.textContent = messageText;

            newMessageDiv.appendChild(messageBubble);
            messagesDisplay.appendChild(newMessageDiv);

            // 스크롤을 맨 아래로 (이전과 동일)
            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

            // 2. 입력창 내용 변경 및 업데이트
            inputBar.innerHTML = '<span contenteditable="true" class="editable-text">가수</span>?이 부른 거였는데..';
            
            // 3. 새로 생성된 editable-text 요소 다시 선택 및 포커스
            // HTML 내용이 바뀌었으므로 chatMessageInput 변수도 새로 선택해야 합니다.
            chatMessageInput = inputBar.querySelector('.editable-text'); 
            if (chatMessageInput) {
                chatMessageInput.focus();
                // 커서를 '가수' 텍스트 끝으로 이동 (선택 사항)
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(chatMessageInput.childNodes[0], chatMessageInput.childNodes[0].length); // 텍스트 노드의 끝으로
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    // 엔터 키를 눌렀을 때 메시지 추가
    // inputBar에 keypress 이벤트를 리스닝하여 동적으로 변경되는 editable-text를 처리합니다.
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
