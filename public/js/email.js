const new_btn = document.querySelector('.create-email')
if(new_btn !== null) {
    new_btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const email = document.querySelector('input').value.trim()
        const messages = document.querySelector(".messages")
        const text = document.querySelector(".messages-text")
        if(email === "") {
            text.innerHTML = "Fill the required fields"
            messages.style.display = "block"
        }
        else {
            const res = await fetch('/email/save', {
                method: 'POST',
                body: JSON.stringify({ email }),
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

const edit_btn = document.querySelector('.edit-email')
if(edit_btn !== null) {
    edit_btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const email_id = document.querySelector("#email_id").value
        const address = document.querySelector("#address").value.trim()
        const messages = document.querySelector(".messages")
        const text = document.querySelector(".messages-text")
        if(address === "") {
            text.innerHTML = "Fill the required fields"
            messages.style.display = "block"
        }
        else {
            const res = await fetch('/email/update', {
                method: 'POST',
                body: JSON.stringify({ email_id, address }),
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