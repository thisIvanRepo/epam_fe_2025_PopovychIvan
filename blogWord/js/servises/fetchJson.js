async function fetchJson(url) {
    try {
        const response = await fetch(url);
        //add response.ok for simulation on real GET
        if (!response || !response.ok) {
            throw new Error('ERROR, Something went wrong!');
        }

        const string = await response.text();

        return JSON.parse(string);
    } catch {
        console.error(`Failed to fetch ${url}`);

        return undefined;
    }
}

export default fetchJson;
