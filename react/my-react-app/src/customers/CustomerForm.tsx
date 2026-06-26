import { useForm } from "react-hook-form";

interface CustomerFormData {
    customerName: string;
    customerEmail: string;
}

function CustomerForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>();

    return (
        <div>
            <h1>Customer Form</h1>
            <form onSubmit={handleSubmit((data) => { console.log(data) })}>
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("customerName", {
                            required: "This field is required",
                            minLength: {
                                value: 3,
                                message: "Customer name must be at least 3 characters",
                           
                            },
                        })}
                         />
                         </div>

                 <div className="mb-3">
                <label htmlFor="customerEmail" className="form-label">Customer Email</label>
              <input
                type="text"
                className="form-control"
                {...register("customerEmail", {
                  required: "This field is required",
                   pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                  },
                })}
                placeholder="Enter customer email"
              />
              {errors.customerEmail?.type === "required" && <span className="text-danger">This field is required</span>}
              {errors.customerEmail?.type === "pattern" && <span className="text-danger">Please enter a valid email address</span>}
            </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CustomerForm;