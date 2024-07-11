import createHttpMethods from "@/utils/custom-http";
import environments from '../config/environments';

const httpMethods = createHttpMethods(environments.NEXT_PUBLIC_API_BASE_URL);

export const findAll = async ({ page = 1, limit = 10, order = 'desc' }) => {
    const config = {
        params: { page: page, limit: limit, order: order }
    }
    const { data } =  await httpMethods.get({ url:`/api/v1/tasks`, config});
    return data;
}

export const findByUUID = async (uuid) => {
    const { data } =  await httpMethods.get({ url:`/api/v1/tasks/${uuid}`});
    return data;
}

export const deleteTask = async (uuid) => {
    await httpMethods.post({ url: `/api/v1/tasks/delete/${uuid}` });
}

export const createTask = async (data) => {
   const body = cleanData(data);
    const config = {
        url: '/api/v1/tasks/create',
        data: body
    }
    await httpMethods.post(config)
}

export const updateTask = async (uuid, data) => {
    data.uuid = uuid
    data.isCompleted = data.isCompleted === 'on';
    const body = cleanData(data);
    const config = {
        url: '/api/v1/tasks/update',
        data: body
    }
    await httpMethods.post(config)
}

const cleanData = (data) => {
    for (const key in data) {
        if (!data[key]) {
            delete data[key];
        }
    }
    return data;
}