import { useEffect } from 'react';

let cloudinary;
let widget;

const UploadWidget = ({ children, onUpload }) => {

  useEffect(() => {
  

    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if ( !widget ) {
        widget = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

  }, []);

  function createWidget() {

    const options = {
      cloudName: "ddvj2kdyz", // Ex: mycloudname
      uploadPreset: "g8qytcob", // Ex: myuploadpreset
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if ( error || result.event === 'success' ) {
          console.log('URL:', result.info.secure_url);
          onUpload(error, result, widget);
          const img = document.createElement('img');
          img.src = result.info.secure_url;
          document.body.appendChild(img);
        }
      }
    );
  }

  function open() {
    if ( !widget ) {
      widget = createWidget();
    }
    widget && widget.open();
  }

  return (
    <>
      {children({ cloudinary, widget, open})}
    </>
  )
}

export default UploadWidget;