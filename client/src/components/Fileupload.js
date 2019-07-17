import React from 'react'

const style = {
  marginLeft: "372px"
}
function Fileupload(props) {
  return (
    <div className='fileupload'>
      <div className='col-md-8 mt-8'>
        <form className="col-md-6" method="post" style={style} onSubmit={props.handleSubmit}>
          <div className="custom-file mb-4">
            <input name="csvfile" type="file" onChange={props.handleFileUpload} />
            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Fileupload;
