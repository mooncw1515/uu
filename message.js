document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 하나의 입력창
    const sendButton = document.querySelector('.send-button'); // 전송 버튼

    // 첫 번째 메시지 생성 함수
    function getFirstMessage() {
        const editableText = chatMessageInput.textContent.trim(); // 노래 부분
        return `아 혹시 저번에 너네 집에서 ${editableText} 들었을 때 났던 향 기억나?`;
    }

    // 두 번째 메시지 생성 함수 (가수 부분 수정 후)
    function getSecondMessage() {
        const gasuText = chatMessageInput.textContent.trim(); // 가수 부분
        return `아 혹시 저번에 너네 집에서 ${gasuText} 부른 거였는데...`;
    }

    // 첫 번째 메시지 추가
    function addFirstMessage() {
        let messageText = getFirstMessage(); // 첫 번째 메시지 가져오기

        if (messageText !== '') {
            addMessage(messageText); // 첫 번째 메시지 추가

            // 입력창을 두 번째 텍스트로 변경
            chatMessageInput.textContent = ' <가수>?이 부른 거였는데...'; // 입력창 텍스트 변경
            makeGasuEditable(); // "가수" 부분을 수정 가능하게 만들기
        }
    }

    // 두 번째 메시지 추가 (가수 부분 수정 후)
    function addSecondMessage() {
        let messageText = getSecondMessage(); // 두 번째 메시지 가져오기

        if (messageText !== '') {
            addMessage(messageText); // 두 번째 메시지 추가
            chatMessageInput.textContent = ''; // 입력창 초기화
        }
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

    // "가수" 부분을 수정 가능하게 만드는 함수
    function makeGasuEditable() {
        const editableText = chatMessageInput.textContent;

        // "가수" 부분만 <span contenteditable="true">로 감싸기
        chatMessageInput.innerHTML = editableText.replace(
            '<가수>', 
            '<span contenteditable="true" class="editable-gasu">가수</span>'
        );

        const editableGasu = document.querySelector('.editable-gasu');
        editableGasu.addEventListener('input', function() {
            // 실시간으로 수정된 가수 텍스트를 업데이트
            chatMessageInput.innerHTML = chatMessageInput.innerHTML.replace(
                /<span contenteditable="true" class="editable-gasu">.*?<\/span>/,
                `<span contenteditable="true" class="editable-gasu">${editableGasu.textContent}</span>`
            );
        });

        // 엔터 키를 누르면 전체 문장 출력
        editableGasu.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addSecondMessage(); // 두 번째 메시지 추가
            }
        });
    }

    // 엔터 키를 눌렀을 때 첫 번째 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (chatMessageInput.textContent.trim() !== '') {
                addFirstMessage(); // 첫 번째 메시지 추가
            }
        }
    });

    // '전송' 버튼 클릭 시 첫 번째 메시지 추가
    sendButton.addEventListener('click', function() {
        if (chatMessageInput.textContent.trim() !== '') {
            addFirstMessage(); // 첫 번째 메시지 추가
        }
    });
});
