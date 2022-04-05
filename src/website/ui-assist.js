function insertStartBtns(){
    let btnContainer = document.createElement("div");
    btnContainer.id = "startActions";

    let newClaimBtn = document.createElement('button');
    newClaimBtn.innerText = "Start a new claim";
    newClaimBtn.onclick = handleOnclick;
    newClaimBtn.msg = "I'd like to start a new claim.";
    newClaimBtn.id = "newClaimBtn"

    let trackClaimBtn = document.createElement('button');
    trackClaimBtn.onclick = handleOnclick;
    trackClaimBtn.innerText = "Track existing claim";
    trackClaimBtn.msg = "I'd like to track an existing claim.";
    trackClaimBtn.id = "trackClaimBtn"

    btnContainer.append(newClaimBtn, trackClaimBtn);
    document.body.appendChild(btnContainer);

    function handleOnclick(e){
        let elem = e.target;
        let message = elem.msg;

        if(window.loader){
            window.loader.compLoader.api.postText(message);
        }
        // hiding btns after first interaction
        btnContainer.classList.add('hide');
    }
}

function handleIncomingMsg(msg){
    let isBot = msg.classList.contains('message-bot');
    let isPreviousBot = msg.previousElementSibling?.classList.contains('message-bot')
    if(isBot && isPreviousBot){
        msg.previousElementSibling.classList.add('hide-actions');
    }
}

let startBtnsInserted = false;
let observer = new MutationObserver(function(mutationsList,observer){
    for(const mutation of mutationsList) {
        let node = mutation.addedNodes[0];
        if(node && node.nodeType === 1){
            if(!startBtnsInserted){
                if(node.id === "lex-web"){
                    startBtnsInserted = true;
                    insertStartBtns();
                }
            }
            if(node.classList.contains("message")){
                handleIncomingMsg(node)
            }
        }
    }
});

observer.observe(document.body,{childList:true, subtree:true})