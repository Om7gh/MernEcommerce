import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
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
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate, useParams } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, product } = useSelector((state) => state.productDetails);
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
  const [oldImages, setOldImages] = useState([]);
  const [imagePrev, setImagePrev] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (product?._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    console.log(product._id);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated, id, updateError, product]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => myForm.append("images", image));
    dispatch(updateProduct(id, myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePrev([]);
    setOldImages([]);

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
      <MetaData title="Update Product | admin" />
      <div className="dashboard">
        <SideBar />
        <div className="newProduct_container">
          <img src={Image} alt="img" className="img-header" />

          <form
            className="createProduct_form"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h2>Update Product</h2>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="createProduct_form-img">
              {imagePrev.map((img, index) => (
                <img key={index} src={img} alt="product prev" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
