const editor = document.getElementById("editor")

let savedSelection = null

// Save selection whenever the user clicks or types in the editor
editor.addEventListener("mouseup", saveSelection)
editor.addEventListener("keyup", saveSelection)

function saveSelection() {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
        savedSelection = selection.getRangeAt(0)
    }
}

function restoreSelection() {
    if (savedSelection) {
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(savedSelection)
    }
}

// Apply font size to selected text
function applyFontSize() {
    restoreSelection()

    const size = document.getElementById("fontSize").value
    document.execCommand("fontSize", false, "7")

    const fonts = editor.getElementsByTagName("font")
    for (let i = 0; i < fonts.length; i++) {
        fonts[i].style.fontSize = size + "px"
    }
}

// Download the document
function download() {
    const text = editor.innerText
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "document.txt"
    link.click()

    URL.revokeObjectURL(url)
}

// Upload a text file
function uploadFile() {
    const file = document.getElementById("upload").files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
        editor.innerText = e.target.result
    }
    reader.readAsText(file)
}
