document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area');
    const inputBar = document.querySelector('.input-bar');
    let currentInputState = 0; // 0: 첫 번째 문장 ('노래'), 1: 두 번째 문장 ('가수'), 2: 일반 입력

    const defaultInputMessage = "메시지를 입력하세요..."; // 기본 입력창 문구 정의
    const messageDelay = 1500; // 1.5초

    // 메시지를 채팅창에 추가하는 헬퍼 함수
    function addMessageToChat(text, type = 'right', bubbleColor = 'blue') {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.classList.add('message-row', type); 
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', bubbleColor);
        messageBubble.textContent = text;

        newMessageDiv.appendChild(messageBubble);
        messagesDisplay.appendChild(newMessageDiv);

        // 스크롤을 맨 아래로
        messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    }

    // 자동 메시지 시퀀스를 처리하는 함수
    function startAutoMessageSequence() {
        let delay = messageDelay; // 첫 메시지는 1.5초 후

        // 1. "그거 무슨 향인지 궁금해서..ㅠ" (파란색)
        setTimeout(() => {
            addMessageToChat("그거 무슨 향인지 궁금해서..ㅠ", 'right', 'blue');
        }, delay);

        // 2. "참고로 이걸 구실로 어떻게 다시 해보자는 거 아니니까 진짜 향만 알려주라" (파란색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("참고로 이걸 구실로 어떻게 다시 해보자는 거 아니니까 진짜 향만 알려주라", 'right', 'blue');
        }, delay);

        // 3. "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" (회색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", 'left', 'gray');
        }, delay);

        // 4. "아" (회색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("아", 'left', 'gray');
        }, delay);

        // 5. "탑은 [1]고, 미들은 [2]고, 베이스는 [3]" (회색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("탑은 [1]고, 미들은 [2]고, 베이스는 [3]", 'left', 'gray');
        }, delay);

        // 6. "ㄱㅅㄱㅅ" (파란색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("ㄱㅅㄱㅅ", 'right', 'blue');
        }, delay);

        // 7. "어이없겠지만 혹시 향료 비율도 알려줄 수 있어?" (파란색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("어이없겠지만 혹시 향료 비율도 알려줄 수 있어?", 'right', 'blue');
        }, delay);

        // 8. "어이없는데 웃겨서 말해줄게" (회색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("어이없는데 웃겨서 말해줄게", 'left', 'gray');
        }, delay);

        // 9. "[1] {}%, [2] {}%, [3] {}%" (회색)
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("[1] {}%, [2] {}%, [3] {}%", 'left', 'gray');
        }, delay);

        // 10. "ㄱㅅㄱㅅ" (파란색) - 최종 추가 요청
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("ㄱㅅㄱㅅ", 'right', 'blue');
        }, delay);

        // 11. "야 너 진짜 이게 목적이네.." (회색) - 최종 추가 요청
        delay += messageDelay;
        setTimeout(() => {
            addMessageToChat("야 너 진짜 이게 목적이네..", 'left', 'gray');
        }, delay);

        // 화면 전환: 모든 자동 메시지가 끝난 후 7초 뒤
        const totalAutoMessageDuration = delay; // 마지막 메시지까지의 총 시간
        const transitionDelay = totalAutoMessageDuration + (7000 - messageDelay); // 마지막 메시지 출력 기준 7초

        setTimeout(() => {
            window.location.href = 'loading.html';
        }, transitionDelay);
    }

    // 메시지를 추가하고 입력창을 업데이트하는 함수
    function sendMessage() {
        const messageText = inputBar.textContent.trim();

        // 기본 문구를 그대로 전송하는 경우 무시
        if (messageText === defaultInputMessage) {
            return; 
        }

        if (messageText !== '') {
            addMessageToChat(messageText, 'right', 'blue');

            if (currentInputState === 0) {
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text">가수</span>?이 부른 거였는데..';
                currentInputState = 1;
            } else if (currentInputState === 1) {
                inputBar.innerHTML = `<span contenteditable="true" class="editable-text">${defaultInputMessage}</span>`;
                currentInputState = 2;
                startAutoMessageSequence(); // 자동 메시지 시퀀스 시작 함수 호출
            } else {
                inputBar.innerHTML = `<span contenteditable="true" class="editable-text">${defaultInputMessage}</span>`;
            }
            
            const newEditableText = inputBar.querySelector('.editable-text');
            if (newEditableText) {
                newEditableText.focus();
                const range = document.createRange();
                const sel = window.getSelection();
                if (newEditableText.childNodes.length > 0 && newEditableText.childNodes[0].nodeType === Node.TEXT_NODE) {
                    range.setStart(newEditableText.childNodes[0], newEditableText.childNodes[0].length);
                } else {
                    range.setStart(newEditableText, 0); 
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
            e.preventDefault(); 
            sendMessage();
        }
    });

    // '전송' 버튼 클릭 시 메시지 추가
    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
});
