// SignUpPage
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/appContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../config/firebaseConfig";
import { LOGIN } from "../actions/actions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import placeholder from "../assets/placeholder.png";

function SignUp() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [per, setPer] = useState(null);
  const { authDispatch, isLoading, loadingDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const metadata = {
        contentType: "image/jpeg",
      };
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, "images/" + name);

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // navigate('/')
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        name: name,
        email: email,
        sex: sex,
        address: address,
        country: country,
        password: password,
        timeStamp: serverTimestamp(),
      });
      authDispatch({ type: LOGIN, payload: res.user });
      loadingDispatch({ type: "loadingTrue" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign">
      <div className="b-top-right p-absolute-top-right w-1 p-2 align-end b-color-white"></div>
      {isLoading ? <div className="loading"></div> : <></>}
      <div className="p-1">
        <h5 className="color-white md-2">Sign up</h5>
        <form onSubmit={handleSignUp} className="md-2">
          {/* File */}
          <div className="align-center" id="image">
            <label htmlFor="file">
              <div
                className="placeholder align-center"
                style={{
                  backgroundImage: file
                    ? `url(${URL.createObjectURL(file)})`
                    : `url(${placeholder})`,
                }}
              >
              </div>
              Upload image
              {/* : <i className="fas fa-file-upload"></i> */}
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <input
            id="name"
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Sex */}
          <input
            id="sex"
            type="sex"
            placeholder="Sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
          {/* Address */}
          <input
            id="address"
            type="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* Country */}
          <input
            id="country"
            type="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className="password-holder">
            <input
              id="password"
              type={passwordType}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="pass-toggler color-white"
              onClick={() =>
                passwordType == "password"
                  ? setPasswordType("text")
                  : setPasswordType("password")
              }
            >
              {passwordType == "password" ? (
                <i className="far fa-eye"></i>
              ) : (
                <i className="far fa-eye-slash"></i>
              )}
            </button>
          </div>
          <button
            className="my_btn"
            disabled={per !== null && per < 100}
            type="submit"
          >
            sign up
          </button>
        </form>
      </div>
      <div className="b-bottom-left p-absolute-bottom-left w-1 p-2 b-color-white"></div>
    </div>
  );
}

export default SignUp;
