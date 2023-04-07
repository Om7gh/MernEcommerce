import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import { clearErrors, createProduct } from "../../actions/productAction";
import "./newProduct.css";
import { Button } from "@mui/material";
import Image from "../../asset/create.jpg";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import SideBar from "./SideBar";
import { CREATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const history = useNavigate();

  const Categories = [
    "Laptop",
    "Smartphone",
    "Watch",
    "Tv",
    "Electronic",
    "Security",
    "Headphones",
    "Camera",
  ];
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePrev, setImagePrev] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      history("/admin/dashboard");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => myForm.append("images", image));
    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePrev([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePrev((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product | admin" />
      <div className="dashboard">
        <SideBar />
        <div className="newProduct_container">
          <img src={Image} alt="img" className="img-header" />

          <form
            className="createProduct_form"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h2>Create Product</h2>
            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <Description />
              <textarea
                type="text"
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <AccountTree />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose category" hidden>
                  Choose category
                </option>
                {Categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="chosenFile">
              <input
                type="file"
                name="images[]"
                accept="image/*"
                multiple
                onChange={createProductImageChange}
              />
            </div>
            <div id="createProduct_form-img">
              {imagePrev.map((img, index) => (
                <img key={index} src={img} alt="avatar prev" />
              ))}
            </div>
            <Button id="createProductBtn" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
