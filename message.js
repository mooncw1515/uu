document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area'); // 대화 메시지가 표시될 영역
    const chatMessageInput = document.querySelector('.input-bar .editable-text'); // 입력창
    const sendButton = document.querySelector('.send-button'); // 전송 버튼

    // 엔터 키를 눌렀을 때 첫 번째 메시지 추가
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let messageText = getFirstMessage(); // 첫 번째 메시지 가져오기

            if (messageText !== '') {
                // 첫 번째 메시지 추가
                addMessage(messageText);

                // 입력창을 두 번째 텍스트로 변경
                chatMessageInput.textContent = ' <가수>?이 부른 거였는데...'; // 입력창 텍스트 변경
                makeGasuEditable(); // "가수" 부분을 수정 가능하게 만들기
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

            // 두 번째 메시지로 <가수>? 부분 추가
            chatMessageInput.textContent = ' <가수>?이 부른 거였는데...'; // 입력창 텍스트 변경
            makeGasuEditable(); // "가수" 부분을 수정 가능하게 만들기
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
                const finalMessage = getFinalMessage(editableGasu.textContent); // 수정된 "가수" 부분을 포함한 메시지
                addMessage(finalMessage); // 최종 메시지 출력

                // 입력창 초기화
                chatMessageInput.textContent = ''; 
            }
        });
    }

    // 수정된 "가수" 부분을 포함하여 최종 문장 가져오기
    function getFinalMessage(gasuText) {
        return `아 혹시 저번에 너네 집에서 ${gasuText} 들었을 때 났던 향 기억나?`;
    }
});
