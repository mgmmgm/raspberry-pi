
const getLedState = async() => {
    const response = await fetch('/led');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
};

export default {getLedState};