import axios from 'axios';

const httpInstance = (baseURL, headers = {}) => {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });
};

const createHttpMethods = (baseURL, headers = {}) => {
    const instance = httpInstance(baseURL, headers);

    return {
        get: async (config) => {
            const { data } =  await instance.get(config.url, config?.config);
            return data;
        },
        post: async (config) => {
            const { data } =  await instance.post(config.url, config?.data, config?.config);
            return data;
        }
    };
};

export default createHttpMethods;
