import api from '../apis';
import { toast } from "sonner";

export const getGlAccountAll = async () => {
    try {
        const response =  api.get('/api/services/app/GLAccount/GetAll');
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export const getCostCenterAll = async () => {
    try {
        const response =  api.get('/api/services/app/CostCenter/GetAll');
        console.log(response);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getTransaction = async () => {
    try {
        const response =  api.get('/api/services/app/Transaction/GetAll');
        console.log(response);

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const createTransaction= async (data:any) => {
    console.log(data)
    // const formData = JSON.parse(data)
    // console.log(formData)
    try {
        const response =  api.post('/api/services/app/Transaction/Create',data);
        console.log(response);
        toast.success("Successfully submitted!");

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};