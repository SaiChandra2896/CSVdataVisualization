import React from 'react'

const style = {
  marginLeft: "372px"
}
function Fileupload() {
  return (
    <div className='fileupload'>
      <div className='col-md-8 mt-4'>
        <form className="col-md-6" method="post" enctype="multipart/form-data" style={style}>
          <div className="custom-file mb-4">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" htmlfor="customFile">Choose file</label>
          </div>
          <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>
      </div>
    </div>
  )
}

export default Fileupload;
