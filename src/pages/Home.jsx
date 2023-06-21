import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Blogscomp from "../components/Blogscomp";
import Snipper from "../components/Snipper";
import Tags from "../components/Tags";
import Trendng from "../components/Trendng";

const Home = ({ setActive, user }) => {
  const [loading, setloading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const uns = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tag = [];
        snapshot.docs.forEach((doc) => {
          tag.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniquetags = [...new Set(tag)];
        setTags(uniquetags);
        setBlogs(list);
        setloading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    const gettrendingones = async () => {
      const blogref = collection(db, "blogs");
      const queries = query(blogref, where("trending", "==", "yes"));
      const querysnapshot = await getDocs(queries);
      let trendblogs = [];
      querysnapshot.forEach((doc) =>
        trendblogs.push({ id: doc.id, ...doc.data() })
      );
      setTrending(trendblogs);
    };

    return () => {
      uns();
      gettrendingones();
    };
  }, []);

  console.log(blogs);

  if (loading) {
    return <Snipper />;
  }

  const handledelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setloading(true);
        await deleteDoc(doc(db, "blogs", id));
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid pb-4 pt-4 padding">
        <div className="container padding">
          <div className="row mx-0">
            <Trendng blogs={trending} />
            <div className="col-md-8">
              <Blogscomp
                blogs={blogs}
                user={user}
                handledelete={handledelete}
              />
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
