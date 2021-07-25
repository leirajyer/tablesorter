$(function() {
    const getData = async() => {
        const response = await fetch('https://api.github.com/repositories/19438/commits');
        return data = await response.json();
    }

    // get data from github
    getData()
        .then(data => createTableData(data))
        .catch(reason => renderFail(reason.message))

    // Loop data from github data
    function createTableData(data) {

        let renderHTML = '<table id="commit-table-sorter" class="tablesorter">';
        renderHTML += '<thead>';
        renderHTML += '<tr>';
        renderHTML += '<th class="commit-author">Authors Name</th>';
        renderHTML += '<th class="commit-date">Author Commit Date</th>';
        renderHTML += '<th class="commit-message">Message</th>';
        renderHTML += '<th class="commit-url">Commit URL</th>';
        renderHTML += '</tr>';
        renderHTML += '</thead>';
        renderHTML += '<tbody>';

        for (const [key, value] of Object.entries(data)) {
            console.log(value['commit']['author']);
            let commitAuthor = value['commit']['author']['name'];
            let commitDate = value['commit']['author']['date'];
            let commitMessage = value['commit']['message'];
            let commitUrl = value['commit']['url'];
            let formattedData = formatDate(commitDate);

            renderHTML += '<tr>';
            renderHTML += `<td>${commitAuthor}</td>`;
            renderHTML += `<td>${formattedData}</td>`;
            renderHTML += `<td>${commitMessage}</td>`;
            renderHTML += `<td><a href="${commitUrl}" target="_blank">${commitUrl}</a></td>`;
            renderHTML += '</tr>';
        }
        renderHTML += '</tbody>';
        renderHTML += '</table>';

        renderTable(renderHTML);
    }

    // Fail message
    function renderFail(error) {
        console.log(error);
    }

    // Format date
    function formatDate(givenDate) {
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let d = new Date(givenDate);

        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${month} / ${date} / ${year}`;
    }

    // Do tablesorter.js 
    function doSortingTable() {
        $("#commit-table-sorter").tablesorter({
            headers: {
                '.commit-message, .commit-url': {
                    // Disable sorter on these columns
                    sorter: false
                }
            }
        });
    }

    // Render to table to frontend
    function renderTable(renderHTML) {
        $('#table-placeholder').empty().append(renderHTML);
        doSortingTable();
    }
});