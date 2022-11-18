const axios = require('axios');

module.exports = async function () {
    const response = await axios.get('https://raw.githubusercontent.com/hacs/integration/main/hacs.json');
    return response.data;
}