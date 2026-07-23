import { useState } from "react";
import Stepper, { Step } from "../components/ui/Stepper";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zip: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: "",
    address: "",
    city: "",
    zip: "",
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="w-full" style={{ maxWidth: "1600px" }}>
        <Stepper
          initialStep={1}
          backButtonText="Back"
          nextButtonText="Next"
          onFinalStepCompleted={() => console.log("Order placed")}
          stepCircleContainerClassName="!w-full !max-w-none min-h-[63vh] p-8 [&_.w-10]:!w-20 [&_.h-10]:!h-20 [&_.w-8]:!w-16 [&_.h-8]:!h-16 [&_.text-sm]:!text-2xl [&_.text-xs]:!text-xl"
          contentClassName="px-8"
          footerClassName="px-8"
          backButtonProps={{
            className:
              "px-10 py-6 text-2xl font-semibold rounded-xl cursor-pointer  border border-gray-300 hover:bg-gray-100 transition-all",
          }}
          nextButtonProps={{
            className:
              "px-10 py-6 text-2xl font-semibold rounded-xl cursor-pointer bg-black text-white hover:bg-gray-800 transition-all",
          }}>
          {/* Step 1: Shipping */}
          <Step>
            <h2 className="text-7xl font-bold mb-14">Shipping Details</h2>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-3xl text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={shipping.fullName}
                  onChange={(e) =>
                    setShipping({ ...shipping, fullName: e.target.value })
                  }
                  className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-3xl text-gray-600">Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  value={shipping.address}
                  onChange={(e) =>
                    setShipping({ ...shipping, address: e.target.value })
                  }
                  className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <label className="text-3xl text-gray-600">City</label>
                  <input
                    type="text"
                    placeholder="Cairo"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                    className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-3xl text-gray-600">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="12345"
                    value={shipping.zip}
                    onChange={(e) =>
                      setShipping({ ...shipping, zip: e.target.value })
                    }
                    className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </Step>

          {/* Step 2: Payment */}
          <Step>
            <h2 className="text-7xl font-bold mb-14">Payment Details</h2>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-3xl text-gray-600">Name on Card</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={payment.cardName}
                  onChange={(e) =>
                    setPayment({ ...payment, cardName: e.target.value })
                  }
                  className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-3xl text-gray-600">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    setPayment({ ...payment, cardNumber: e.target.value })
                  }
                  className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <label className="text-3xl text-gray-600">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={(e) =>
                      setPayment({ ...payment, expiry: e.target.value })
                    }
                    className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-3xl text-gray-600">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={payment.cvv}
                    onChange={(e) =>
                      setPayment({ ...payment, cvv: e.target.value })
                    }
                    className="text-3xl px-8 py-7 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-2xl">
                This is a demo checkout — no real payment will be processed.
              </p>
            </div>
          </Step>

          {/* Step 3: Confirmation */}
          <Step>
            <div className="flex flex-col items-center text-center gap-8 py-14">
              <CheckCircle2 className="size-44 text-green-500" />
              <h2 className="text-5xl md:text-8xl font-bold">
                Order Confirmed!
              </h2>
              <p className="text-3xl text-gray-500">
                Thanks, {shipping.fullName || "friend"} — your order is on its
                way.
              </p>
              <Link
                to="/"
                className="mt-8 px-14 py-8 bg-black text-white rounded-2xl text-3xl hover:bg-gray-800 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                Back to Home
              </Link>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
