export interface DiscountContent {
  discountAmount: string;
  discountType: string;
  discountColor: string;
}

export interface UserInfo {
  email: string;
  name: string;
  discount: string;
}

export interface UserInfoError {
  emailErr: string;
  nameErr: string;
}
