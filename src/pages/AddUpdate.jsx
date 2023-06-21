import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialstate = {
  title: "",
  tags: [],
  trending: "",
  category: "",
  description: "",
};

const categoryoptions = [
  "bollywood",
  "technology",
  "food",
  "politics",
  "sports",
  "business",
];

const AddUpdate = ({ user, setActive }) => {
  const [form, setform] = useState(initialstate);
  const [file, setfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const user_id = user?.uid;
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("userid:", user?.uid);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handletags = (tags) => {
    setform({ ...form, tags });
  };
  const handletrending = (e) => {
    setform({ ...form, trending: e.target.value });
  };
  const oncategorychange = (e) => {
    setform({ ...form, category: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (id) {
      if (category && tags && title && description && trending) {
        await updateDoc(doc(db, "blogs", id), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
        toast.success("Blog Updated Successfully");
      } else {
        toast.error("Pls fill atleast something while editing!");
      }
    } else {
      if (category && tags && title && file && description && trending) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog Created Successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("Pls fill all the fields!");
      }
    }

    navigate("/");
  };

  const { title, tags, trending, category, description } = form;
  useEffect(() => {
    const uploadimage = () => {
      const storageref = ref(storage, file.name);
      const uploadimg = uploadBytesResumable(storageref, file);
      uploadimg.on(
        "state_changed",
        (snapshot) => {
          // this below commans is used for checking progress in image
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("uploading is paused");
              break;

            case "running":
              console.log("uploading in progress");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadimg.snapshot.ref).then((downloadUrl) => {
            setform((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadimage();
  }, [file]);

  const getblogdetails = async () => {
    const docref = doc(db, "blogs", id);
    const snap = await getDoc(docref);
    if (snap.exists()) {
      setform({ ...snap.data() });
    }
    setActive(null);
  };

  useEffect(() => {
    id && getblogdetails();
  }, [id]);
  return (
    <>
      <br />
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12">
            <div className="text-center heading py-2">
              <h2>{id ? "Update Blog!" : "Create A new Blog!"}</h2>
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handlesubmit}>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handlechange}
                  />
                </div>

                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Tags"
                    onChange={handletags}
                  />
                </div>

                <div className="col-12 py-3">
                  <span style={{ padding: "10px" }} className="trending">
                    Is is Trending?{" "}
                  </span>
                  <span>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        className=" form-check-input"
                        value="yes"
                        //   style={{ padding: "10px" }}
                        name="radiooptions"
                        onChange={handletrending}
                        checked={trending === "yes"}
                        style={{ marginRight: "10px" }}
                      />
                    </label>
                    <label
                      //   style={{ paddingLeft: "12px" }}
                      htmlFor="radiooptions"
                      className="radio-inline form-check-label"
                      style={{ marginRight: "10px" }}
                    >
                      Yes&nbsp;
                    </label>

                    <label className="radio-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        value="no"
                        style={{ marginRight: "10px" }}
                        //   style={{ marginLeft: "12px" }}
                        name="radiooptions"
                        onChange={handletrending}
                        checked={trending === "no"}
                        //   style={{ marginLeft: "10px" }}
                      />
                    </label>
                    <label
                      //   style={{ marginRight: "458px" }}
                      htmlFor="radiooptions"
                      className="form-check-label radio-inline"
                    >
                      No
                    </label>
                  </span>
                </div>

                <div className="col-12 py-3">
                  <select
                    value={category}
                    name="category"
                    onChange={oncategorychange}
                    className="catg-dropdown"
                    style={{ marginRight: "450px" }}
                  >
                    <option>Pls Select Any Category</option>

                    <option>Bollywood</option>
                    <option>Technology</option>
                    <option>Politics</option>
                    <option>Sports</option>
                    <option>Food</option>
                    <option>Business</option>
                  </select>
                </div>

                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handlechange}
                  />
                </div>

                {!id && (
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(event) => setfile(event.target.files[0])}
                    />
                  </div>
                )}

                <div className="col-12 py-3 text-center">
                  <button
                    className="btn btn-add"
                    style={{ backgroundColor: "black", color: "white" }}
                    type="submit"
                    disabled={progress != null && progress < 100}
                  >
                    {id ? "Edit" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdate;
