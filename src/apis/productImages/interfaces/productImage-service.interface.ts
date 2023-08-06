import { DeleteProductImageInput } from '../dto/delete-productImage.dto';

export interface IProductImagesServiceCreate {
  imageUrls: string[];
  productId: string;
}

export interface IProdcutImagesServiceDelete {
  deleteProductImageInput: DeleteProductImageInput;
}
