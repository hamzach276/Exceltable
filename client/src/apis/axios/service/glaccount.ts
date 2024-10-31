import api from '../apis';

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
