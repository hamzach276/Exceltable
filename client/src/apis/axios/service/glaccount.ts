
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

export const createTransaction= async (data:any,setsetLoader:any) => {
    console.log(data)
    // const formData = JSON.parse(data)
    // console.log(formData)
    try {
        setsetLoader(true)
        const response = await api.post('/api/services/app/Transaction/Create',data);
        console.log(response);
        toast.success("Successfully submitted!");
       

        return response;
        setsetLoader(false)
    } catch (error: any) {
        toast.error(error.message)
        setsetLoader(false)

        throw new Error(error.message);
    }
};
export const  updateTransaction= async (data:any,setIsEditale:any,setsetLoader:any) => {
    console.log(data)
    // const formData = JSON.parse(data)
    // console.log(formData)
    try {
        setsetLoader(true)
        const response = await  api.put('/api/services/app/Transaction/Update',data);
        console.log(response);
        toast.success(" updated Successfully!");
        setIsEditale(true)
        setsetLoader(false)
        return response;
    } catch (error: any) {
        toast.error(error.message);
        setsetLoader(false)
        throw new Error(error.message);

    }
};
export const deleteTransaction= async (id:any) => {
    console.log(id)
    // const formData = JSON.parse(data)
    // console.log(formData)
    try {
        const response = await api.delete('/api/services/app/Transaction/Delete',{params:{id:id}});
        console.log(response);
        toast.success("Deleted Successfully");


        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
