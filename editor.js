const editor = document.getElementById("editor")

function applyFontSize() {
    const size = document.getElementById("fontSize").value
    document.execCommand("fontSize", false, "7")

    let fonts = editor.getElementsByTagName("font")
    for (let i = 0; i < fonts.length; i++) {
        fonts[i].style.fontSize = size + "px"
    }
}


// Download file
function download() {
    const text = editor.innerText
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "document.txt"
    a.click()

    URL.revokeObjectURL(url)
}

// Upload file
function uploadFile() {
    const file = document.getElementById("upload").files[0]
    const reader = new FileReader()

    reader.onload = function(e) {
        editor.innerText = e.target.result
    }

    reader.readAsText(file)
}
