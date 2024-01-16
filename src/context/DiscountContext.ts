import { createContext } from "react";
// import { UserInfo } from "../types/SpinnerContentType";

interface ContextValues {
  onFinished: (value: string) => void;
}

export const DiscountContext = createContext<ContextValues>({
  onFinished: () => {},
});
