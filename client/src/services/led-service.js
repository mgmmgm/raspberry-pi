
const getLedState = async() => {
    const response = await fetch('/led');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
};

const setLedState = async(ledState) => {
    const response = await fetch('/led', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({state: ledState ? 'on': 'off'})
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
}

export default {getLedState, setLedState};