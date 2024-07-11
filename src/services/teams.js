import createHttpMethods from "@/utils/custom-http";
import environments from '../config/environments';

const httpMethods = createHttpMethods(environments.NEXT_PUBLIC_API_BASE_URL);

export const registerEmail = async ({ teamName, email }) => {
    const { data } =  await httpMethods.post({ url:'/api/v1/teams/add/email', data: {
            name: teamName,
            email: email,
        }});
    return data;
}


export const findAllEmail = async (team) => {
    const { data } =  await httpMethods.get({ url:`/api/v1/teams/${team}`});
    return data;
}