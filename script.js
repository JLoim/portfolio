// Function to fetch and display updates from Google Sheets
async function fetchUpdates() {
    const sheetId = '1UKWdmLVrJKNPwMCJaBL_InNb0FYSZk5ePKq5k9hWlBY'; // The correct Sheet ID
    const sheetName = 'Website News'; // The correct Sheet Name
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        // Extract the JSON data from the Google Visualization API response.
        const jsonString = text.substring(text.indexOf("(") + 1, text.lastIndexOf(")"));
        const data = JSON.parse(jsonString);

        const updates = [];

        // Extract updates from the data
        if (data.table && data.table.rows) {
            const rows = data.table.rows;
            for (let i = 0; i < rows.length && i < 3; i++) { // Get the 3 most recent updates
                const row = rows[i];
                const date = row.c[0] ? row.c[0].v : 'No Date'; // Date column (assumes it's the first)
                const update = row.c[1] ? row.c[1].v : 'No Update'; // Update column (assumes it's the second)

                updates.push(`<li>${date}: ${update}</li>`);
            }
        }

        // Display the updates in the footer
        const updateFeed = document.getElementById('update-feed');
        if (updateFeed) {
            updateFeed.innerHTML = updates.join('');
        }

    } catch (error) {
        console.error('Error fetching updates:', error);
        const updateFeed = document.getElementById('update-feed');
        if (updateFeed) {
            updateFeed.innerHTML = '<li>Failed to load updates.</li>';
        }
    }
}

// Call the function to fetch updates when the page loads
window.addEventListener('load', function() {
    fetchUpdates(); // Keep fetching updates

    // Create floating messages
    const messages = [
        "Hey, name is Jonas, welcome to my little website",
        "On the left you will find my hobbies, on the right my work portfolio",
        "On the bottom is just what I am currently up to"
    ];

    const floatingMessagesContainer = document.getElementById('floating-messages');

    messages.forEach((messageText, index) => {
        setTimeout(() => {
            const message = document.createElement('div');
            message.classList.add('floating-message');
            message.textContent = messageText;

            // Add event listener to remove the message on click
            message.addEventListener('click', function() {
                message.remove();
            });

            floatingMessagesContainer.appendChild(message);
        }, index * 5000); // Delay each message by index * 1000 milliseconds (1 second)
    });
});