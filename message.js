document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const inputBar = document.querySelector('.input-bar'); // 전체 입력바 div
    let currentInputState = 0; // 0: 첫 번째 문장 ('노래'), 1: 두 번째 문장 ('가수'), 2: 일반 입력

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

    // 메시지를 추가하고 입력창을 업데이트하는 함수
    function sendMessage() {
        const messageText = inputBar.textContent.trim(); // .input-bar 전체의 텍스트를 가져옴

        if (messageText !== '') {
            // 1. 사용자가 입력한 메시지 추가
            addMessageToChat(messageText, 'right', 'blue');

            // 2. 입력창 내용 변경 및 상태 업데이트
            if (currentInputState === 0) {
                // 첫 번째 메시지 전송 후, 두 번째 문장으로 변경
                inputBar.innerHTML = '아 혹시 저번에 너네 집에서 <span contenteditable="true" class="editable-text">가수</span>?이 부른 거였는데..';
                currentInputState = 1; // 상태를 두 번째 문장으로 변경
            } else if (currentInputState === 1) {
                // 두 번째 메시지 전송 후, 일반 입력창으로 변경
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text">메시지를 입력하세요...</span>';
                currentInputState = 2; // 상태를 일반 입력으로 변경 (더 이상 고정 문구 없음)

                // **** 여기에 새로운 자동 메시지 로직 추가 (세 번째 메시지 이후) ****
                // 첫 번째 자동 메시지 (내 채팅, 파란 말풍선)
                setTimeout(() => {
                    addMessageToChat("그거 무슨 향인지 궁금해서..ㅠ", 'right', 'blue');
                    // 첫 번째 자동 메시지 출력 후, 다음 메시지 1초 후
                    setTimeout(() => {
                        addMessageToChat("참고로 이걸 구실로 어떻게 다시 해보자는 거 아니니까 진짜 향만 알려주라", 'right', 'blue');
                        // 두 번째 자동 메시지 출력 후, 다음 메시지 1초 후 (회색 말풍선 시작)
                        setTimeout(() => {
                            addMessageToChat("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", 'left', 'gray');
                            // 세 번째 자동 메시지 출력 후, 다음 메시지 1초 후
                            setTimeout(() => {
                                addMessageToChat("아", 'left', 'gray');
                                // 네 번째 자동 메시지 출력 후, 마지막 메시지 1초 후
                                setTimeout(() => {
                                    addMessageToChat("탑은 [1]고, 미들은 [2]고, 베이스는 [3]", 'left', 'gray');
                                }, 1000); // 총 5초 후
                            }, 1000); // 총 4초 후
                        }, 1000); // 총 3초 후
                    }, 1000); // 총 2초 후
                }, 1000); // 총 1초 후 (가수 메시지 전송 기준)
                // ************************************************************

            } else {
                // 일반 입력 상태에서는 단순히 입력창을 비웁니다.
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text">메시지를 입력하세요...</span>';
            }
            
            // 3. 새로 생성된 editable-text 요소에 포커스 및 커서 이동
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
