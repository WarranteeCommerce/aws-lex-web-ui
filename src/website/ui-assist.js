function handleIncomingMsg(msg){
    let isBot = msg.classList.contains('message-bot');
    let isPreviousBot = msg.previousElementSibling?.classList.contains('message-bot')
    if(isBot && isPreviousBot){
        msg.previousElementSibling.classList.add('hide-actions');
    }
}

let observer = new MutationObserver(function(mutationsList,observer){
    for(const mutation of mutationsList) {
        let node = mutation.addedNodes[0];
        if(node && node.nodeType === 1){
            if(node.classList.contains("message")){
                handleIncomingMsg(node)
            }
        }
    }
});

observer.observe(document.body,{childList:true, subtree:true})