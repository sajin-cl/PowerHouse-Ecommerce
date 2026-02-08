
function CustomerDetailsModal({ order, onCloseBtn }) {

  const shippingAddress = order?.shippingAddress;

  return (
    <>
      <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Customer Details</h5>
              <button className="btn-close" onClick={onCloseBtn}></button>
            </div>
            <div className="modal-body">
              <p><b>Name:</b> {shippingAddress?.name}</p>
              <p><b>Phone:</b> {shippingAddress?.phone}</p>
              <p><b>Address:</b> {shippingAddress?.address}</p>
              <p><b>City:</b> {shippingAddress?.city}</p>
              <p><b>State:</b> {shippingAddress?.state}</p>
              <p><b>Pincode:</b> {shippingAddress?.pincode}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary w-100" onClick={onCloseBtn}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerDetailsModal