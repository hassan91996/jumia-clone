import React, { useRef, useState, useEffect } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [images, setimages] = useState([])


  let m = []

  const filePickerRef = useRef();
  useEffect(() => {
    props.onInput(props.name, file, isValid);
    if (!file) {
      return;
    }
    setimages([])
    file.map(image => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setimages(images => [...images, fileReader.result])
        setPreviewUrl(fileReader.result)
      };
      fileReader.readAsDataURL(image);
    })

  }, [file]);


  const pickedHandler = event => {
    let files = event.target.files
    if (file.length + files.length > 6) {
      return alert('العدد الاقصي 6 صور')
    }
    let Imgs = []
    if (files && event.target.files.length >= 1) {
      Object.keys(files).map(i => {
        Imgs.push(files[i])
      })
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setFile(f => [...f, ...Imgs])

  };
  const pickImageHandler = () => {
    if (file.length >= 6) {
      return alert('العدد الاقصي 6 صور')
    }
    filePickerRef.current.click();
  };


  const deletehandler = () => {
    if (!file) {
      return;
    }

  }
  const samllImages = images ? images.map((img, i) => {
    return <img alt="smallimage" key={i} src={img} className='samllImage' onClick={() => setPreviewUrl(img)} />
  }) : null
  return (
    <div className="imageupload">
      <input
        id={props.id}
        ref={filePickerRef}
        multiple
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="show">
        <div className="right">
          <button type="button" onClick={pickImageHandler}>
            <AddAPhotoIcon className="icon" />
            اضافة صورة
          </button>
          <div className="samllImages">
            {samllImages}
          </div>
        </div>
        <div className="left">
          <div className='image-upload'>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
          </div>
        </div>
      </div>


    </div>
  );
};

export default ImageUpload;
