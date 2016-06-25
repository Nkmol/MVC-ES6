export default class Utility {
    // Load HTML view from Template folder
    // @return html/text
    static getView(url) {
        url = 'src/Templates/' + url;
        return fetch(url, {
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => response.text())
            .catch(e => console.error(e));
    }
}