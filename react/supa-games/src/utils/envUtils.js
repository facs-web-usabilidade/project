function getApiPort() {
    return process.env.REACT_APP_API_PORT;
}

function getApiEndpoint() {
    return process.env.REACT_APP_API_ENDPOINT;
}

function getApiHost() {
    return process.env.REACT_APP_API_HOST;
}

export function getApiBaseUrl() {
    const apiPort = getApiPort()
    const apiEndpoint = getApiEndpoint()
    const apiHost = getApiHost()
    
    return `${apiHost}:${apiPort}${apiEndpoint}`
}

export default getApiBaseUrl;