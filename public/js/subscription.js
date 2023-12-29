const new_btn = document.querySelector(".new-subscription")
if(new_btn !== null) {
    new_btn.addEventListener("click", async (e) => {
    
        e.preventDefault()
        const _id = document.querySelector("#_id").value
        const item = document.querySelector("#item").value.trim()
        const status = document.querySelector("#status").value.trim()
        const extra = document.querySelector("#extra").value.trim()
        const messages = document.querySelector(".messages")
        const text = document.querySelector(".messages-text")
    
        if(item === "" || status === "") {
            text.innerHTML = "Fill the required fields"
            messages.style.display = "block"
        }
        else {
            const res = await fetch('/subscription/save', {
                method: 'POST',
                body: JSON.stringify({ _id, item, status, extra }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if(data.error === 0) {
                window.location.href = "/"
            }
            else {        
                text.innerHTML = data.message
                messages.style.display = "block"
            }
        }
    })    
}

const edit_btn = document.querySelector(".edit-subscription")
if(edit_btn !== null) {
    edit_btn.addEventListener("click", async (e) => {
    
        e.preventDefault()
        const subscription_id = document.querySelector("#subscription_id").value
        const email_id = document.querySelector("#email_id").value
        const item = document.querySelector("#item").value.trim()
        const status = document.querySelector("#status").value.trim()
        const extra = document.querySelector("#extra").value.trim()
        const messages = document.querySelector(".messages")
        const text = document.querySelector(".messages-text")
    
        if(item === "" || status === "") {
            text.innerHTML = "Fill the required fields"
            messages.style.display = "block"
        }
        else {
            const res = await fetch('/subscription/update', {
                method: 'POST',
                body: JSON.stringify({ subscription_id, email_id, item, status, extra }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if(data.error === 0) {            
                window.location.href = `/subscription/read/${email_id}`
            }
            else {        
                text.innerHTML = data.message
                messages.style.display = "block"
            }
        }
    })
}