import createHttpMethods from "@/utils/custom-http";
import environments from '../config/environments';

const httpMethods = createHttpMethods(environments.NEXT_PUBLIC_API_BASE_URL);
export const createUser = async ({email, password}) => {
    const { data } =  await httpMethods.post({ url:'/api/v1/users/create', data: {
            password: password,
            email: email,
        }});
    return data;
}