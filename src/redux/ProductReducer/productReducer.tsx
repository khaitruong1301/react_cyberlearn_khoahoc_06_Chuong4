import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../util/config';
import { DispatchType } from '../configStore';
export interface ProductModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
}


export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
}




export type ProductState = {
    arrProduct: ProductModel[],
    productDetail: ProductDetailModel | null
}
const initialState: ProductState = {
    arrProduct: [
        {
            "id": 1,
            "name": "Adidas Prophere",
            "alias": "adidas-prophere",
            "price": 350,
            "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
            "size": "[36,37,38,39,40,41,42]",
            "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
            "quantity": 995,
            "deleted": false,
            "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
            "relatedProducts": "[2,3,5]",
            "feature": true,
            "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
        }
    ],
    productDetail: null
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrProduct = action.payload;
        }
    },
    extraReducers(builder) {
        //pending: ??ang x??? l??
        //fulfilled: ???? x??? l?? th??nh c??ng
        //rejected: x??? l?? th???t b???i
        builder.addCase(getProductDetailApi.pending, (state, action) => {
            //b???t loading
        });
        builder.addCase(getProductDetailApi.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            //t???t loading
            state.productDetail = action.payload;
        });
        builder.addCase(getProductDetailApi.rejected, (state, action) => {
            //t???t loading
        })
    },
    /*
        const action = {
            type: 'productReducer/setArrProductAction',
            payload:[]
        }
    */

});
export const { setArrProductAction } = productReducer.actions
export default productReducer.reducer
/* ---------------- action api async action ----------  */
export const getProductApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get('/api/Product');
            const content: ProductModel[] = result.data.content;
            //Sau khi l???y d??? li???u t??? api v??? ch??ng ta s??? dispatch l??n store
            const action: PayloadAction<ProductModel[]> = setArrProductAction(content);
            dispatch(action);

        } catch (err) {
            console.log(err)
        }
    }
}


//C??ch 2: create createAsyncThunk

export const getProductDetailApi = createAsyncThunk('productReducer/getProductDetailApi',
    async (id: string) => {
        const response = await http.get(`/api/product/getbyid?id=${id}`)
        return response.data.content;//ProductDetailModel
})
