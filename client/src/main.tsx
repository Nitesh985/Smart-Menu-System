import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Test from "./pages/Test.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AlertProvider } from "./context/AlertContext.tsx";
import {
  AdminLayout,
  Dashboard,
  Orders,
  OrderDetails,
  EditMenu,
  NotFoundPage,
  PlaceOrder,
  EditOrder,
  UserOrderList,
  DishDescription,
  IndexPage,
  PaymentFailurePage,
  PaymentSuccessPage,
} from "./pages";
import { ModalProvider } from "./context/ModalContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { OrderProvider } from "./context/OrderContext.tsx";
import { OrderList } from "./components/admin";
import { SearchProvider } from "./context/SearchContext.tsx";
import { TableProvider } from "./context/TableContext.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="admin/" element={<AdminLayout />}>
        <Route path="qr-codes" element={<Dashboard />} />
        <Route path="edit-menu" element={<EditMenu />} />
        <Route path="orders/" element={<Orders />}>
          <Route path="" element={<OrderList />} />
        </Route>
          <Route path="kitchen" element={<OrderDetails />} />
      </Route>
      <Route path="" element={<App />}>
        <Route path="/:categoryId" />
      </Route>
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/payment-failure" element={<PaymentFailurePage />} />
      <Route path="/data?" element={<IndexPage />} />
      <Route path="d/:dishId" element={<DishDescription />} />
      <Route path="place-order" element={<PlaceOrder />} />
      <Route path="edit-order/o/:orderId" element={<EditOrder />} />
      <Route path="my-order" element={<UserOrderList />} />
      <Route path="test" element={<Test />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store} >
      <CartProvider>
        <AlertProvider>
          <SearchProvider>
            <OrderProvider>
              <ModalProvider>
                <TableProvider>
                  <RouterProvider router={router} />
                </TableProvider>
              </ModalProvider>
            </OrderProvider>
          </SearchProvider>
        </AlertProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
);
