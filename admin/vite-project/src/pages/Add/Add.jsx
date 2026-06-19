import React from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import adminAxios from "../../utils/adminAxios";
import { toast } from "react-toastify";

const Add = ({url}) => {
    const [image,setImage] = React.useState(false);
    const[data,setData] = React.useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    })
    const onChangeHandler = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const onSubmitHandler = async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",Number(data.price));
        formData.append("image",image);

        const response = await adminAxios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                category: "Salad",
                price: ""
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }
    return (
        <div className="add">
            <h2>Add Food Item</h2>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-details flex-col" >
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type Here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Enter product description"></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Category</p>
                        <select name="category" id="" onChange={onChangeHandler}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                        
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler}  value={data.price} type="text" name="price" placeholder="Enter Price" />
                    </div>
                </div>
                <button type="submit" className="add-btn">Add Product</button>
            </form>
        </div>
    );
};

export default Add;
