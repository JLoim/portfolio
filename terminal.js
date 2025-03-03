document.addEventListener('DOMContentLoaded', function() {
    const codeElement = document.getElementById('terminal-code');
    if (!codeElement) return;

    const originalContent = codeElement.innerHTML;
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    
    // Clear the content
    codeElement.innerHTML = '';
    codeElement.appendChild(cursor);

    let currentIndex = 0;
    const content = originalContent.trim();
    
    function typeNextCharacter() {
        if (currentIndex < content.length) {
            // If we're at the start of a tag, type the whole tag at once
            if (content[currentIndex] === '<') {
                const closeTagIndex = content.indexOf('>', currentIndex);
                if (closeTagIndex !== -1) {
                    const tag = content.substring(currentIndex, closeTagIndex + 1);
                    codeElement.insertBefore(document.createRange().createContextualFragment(tag), cursor);
                    currentIndex = closeTagIndex + 1;
                }
            } else {
                const textNode = document.createTextNode(content[currentIndex]);
                codeElement.insertBefore(textNode, cursor);
                currentIndex++;
            }
            
            setTimeout(typeNextCharacter, 5);
        } else {
            // Animation complete: remove cursor
            cursor.remove();
            codeElement.innerHTML = originalContent.trim();
        }
    }

    typeNextCharacter();
});
