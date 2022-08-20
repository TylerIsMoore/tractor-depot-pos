import apiClient from './client';

/**
 *
 * @param {String} sku
 */
const search = async (sku) => {
    const resp = await apiClient.post('/products/search', {
        sku,
    });

    return resp.data;
};

const productService = {
    search,
};

export default productService;
