import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../store/albums";

const AddAlbumForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);

    const submitAlbum = async (e) => {
        e.preventDefault();

        const userId = user.id;

        const albumObj = {
            userId,
            title
        }

        try {
            let createdAlbum = await dispatch(createAlbum(albumObj));
      
            if (createdAlbum) {
              return history.push(`/my-albums/${userId}`);
            }
          } catch (error) {
            const data = await error.json();
              if (data && data.errors) setErrors(data.errors);
          }
    }

    return (
        <div>
            <h1>Add an Photo Album</h1>
            <form onSubmit={submitAlbum}>

            </form>
        </div>
    )
}

export default AddAlbumForm;