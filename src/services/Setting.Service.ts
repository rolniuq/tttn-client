import { EnumURL } from "../utils/Common";
import HttpService from "./getWays/Setting.GetWay";
import UserDocument from "../interfaces/User.Interfaces";
import OrderDocument from "../interfaces/Order.Interface";
import PaypalDocument from "../interfaces/Paypal.Interface";

//---User
export const Register = async (user: UserDocument) => {
  return await HttpService.post(EnumURL.user, {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    email: user.email,
    password: user.password,
    cPassword: user.cPassword,
  });
};

export const Login = async (email: string, password: string) => {
  return await HttpService.post(EnumURL.login, {
    email: email,
    password: password,
  });
};

export const GetProfile = async () => {
  return await HttpService.get(EnumURL.profile);
};

export const UpdateProfile = async (user: UserDocument) => {
  return await HttpService.put(EnumURL.profile, {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
  });
};

export const ChangePassword = async (
  password: string | undefined,
  newPassword: string | undefined,
  cNewPassword: string | undefined
) => {
  return await HttpService.put(EnumURL.changePassword, {
    password: password,
    newPassword: newPassword,
    cNewPassword: cNewPassword,
  });
};

//---Product
export const GetProductByID = async (id: any) => {
  return await HttpService.get(`${EnumURL.product}/${id}`);
};

export const GetListProducts = async () => {
  return await HttpService.get(EnumURL.products);
};

export const GetListProductsByCategory = async (type: string | undefined) => {
  return await HttpService.get(`${EnumURL.products}/${type}`);
};

//---Category
export const GetListCategories = async () => {
  return await HttpService.get(EnumURL.categories);
};

export const DeleteProduct = async (id: string | undefined) => {
  return await HttpService.delete(`${EnumURL.product}/${id}`);
};

//---Cart
export const AddToCart = async (
  idProduct: string,
  quantity: number,
  size: string
) => {
  return await HttpService.post(EnumURL.cart, {
    product: idProduct,
    quantity: quantity,
    size: size,
  });
};

export const GetListCarts = async () => {
  return await HttpService.get(EnumURL.carts);
};

export const GetCartPriceSelected = async (list: string[] | undefined) => {
  return await HttpService.post(`${EnumURL.cart}/price`, {
    carts: list,
  });
};

export const UpdateCartByID = async (
  id: string,
  quantity: number,
  size: string
) => {
  return await HttpService.put(EnumURL.cart, {
    product: id,
    quantity: quantity,
    size: size,
  });
};

export const DeleteCartByID = async (id: string | undefined) => {
  return await HttpService.delete(`${EnumURL.cart}/${id}`);
};

export const DeleteListCart = async (list: string[] | undefined) => {
  return await HttpService.post(EnumURL.deleteListCarts, {
    carts: list,
  });
};

export const DeleteAllCart = async () => {
  return await HttpService.delete(`${EnumURL.cart}/all`);
};

//Order
export const CreateOrder = async (order: OrderDocument) => {
  return await HttpService.post(EnumURL.order, {
    comment: order.comment,
    infoGuest: order.infoGuest,
    orderDetails: order.orderDetails,
  });
};

export const GetListOrder = async () => {
  return await HttpService.get(EnumURL.order);
};

export const GetOrderHistory = async (status: string) => {
  return await HttpService.get(`${EnumURL.ordersTracking}/${status}`);
};

export const GetProductsForOrder = async (list: any[]) => {
  return await HttpService.post(`${EnumURL.products}/${EnumURL.order}`, {
    list: list,
  });
};

//Statistic
export const StatisticOrdered = async () => {
  return await HttpService.get(EnumURL.statistic);
};

//Paypal
export const GetPricePaypalToCreate = async (items: PaypalDocument[]) => {
  return await HttpService.post(`${EnumURL.paypal}/price`, {
    list: items,
  });
};

export const SavePaypal = async (orderID: string, carts: PaypalDocument[]) => {
  return await HttpService.post(EnumURL.paypal, {
    orderID: orderID,
    orderDetails: carts,
  });
};
