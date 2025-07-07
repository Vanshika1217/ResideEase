import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

export default function PGUPIPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, amount = 7500, formData } = location.state || {};

  if (!user || !amount) {
    return (
      <div className="text-red-500 text-center mt-10">
        Missing payment info. Please go back and try again.
      </div>
    );
  }

  const { upiId, name } = user;
  const txnId = useMemo(() => `TXN${Date.now()}`, []);
  const note = "PG Booking Payment";
  const currency = "INR";

  const upiUrl = useMemo(() => {
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&mc=&tid=${txnId}&tr=${txnId}&tn=${encodeURIComponent(
      note
    )}&am=${amount}&cu=${currency}`;
  }, [upiId, name, txnId, amount]);

  const [isMobile, setIsMobile] = useState(false);
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    QRCode.toDataURL(upiUrl, { width: 200 }, (err, url) => {
      if (!err) setQrImage(url);
    });
  }, [upiUrl]);

  const handlePaymentDone = () => {
    navigate("/pg-booking-confirmed", { state: formData });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">Pay ₹{amount} via UPI</h2>

      {isMobile ? (
        <button
          onClick={() => (window.location.href = upiUrl)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Open UPI App
        </button>
      ) : (
        qrImage && <img src={qrImage} alt="UPI QR Code" className="mx-auto" />
      )}

      <p className="mt-4 text-sm text-gray-600">
        If redirection doesn’t work,{" "}
        <a href={upiUrl} className="text-blue-600 underline">
          click here to pay manually
        </a>
      </p>

      <button
        onClick={handlePaymentDone}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        I’ve Paid
      </button>
    </div>
  );
}
