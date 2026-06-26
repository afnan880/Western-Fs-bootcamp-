import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Customers from './customers/customers.tsx';
import UserList from './userlist/userlist.tsx';
import CustomerDetails from './customers/customerdetails.tsx';
import Navbar from './Navbar/Navbar.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './Hooks/useMemo.tsx';
import List from './list/list.tsx';
import Departments from './Departments/Departments.tsx';
import EmployeeName from './Departments/EmployeeName.tsx';
import CustomerForm from './customers/CustomerForm.tsx';
import DepartmentFormik from './Departments/DepartmentFormik.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/customers/",
        element: <Customers />,
        children: [
          {
            path: "/customers/:id",
            element: <CustomerDetails />,
          },
          {
            path: "/customers/add",
            element: <CustomerForm />,
          },
        ]
      },
      {
        path: "/users",
        element: <UserList />,

      },
      {
        path:"employees",
        element:<List />,
      },
      {
        path: "hooks",
        element:<Counter/>,
      },
       {
        path: "Departments",
        element:<Departments/>,
      },
        {
        path: "Departments/Add",
        element:<DepartmentFormik/>,
      },
      {
        path: "EmployeeName",
        element:<EmployeeName/>,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
